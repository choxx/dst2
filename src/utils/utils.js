import base64 from 'base-64';
import { store } from '../redux/store';
import {loaderSet, notifySet, userSet} from '../redux/actions';
import { queryString, userLogout } from '../common/globals';
import moment from "moment";


const validateResponse = async (response) => {
  const apiRes = await response.json();
  const jsonResponse = {
    ...apiRes,
    responseStatus: false,
  };
  /*const { resp: { params: { status, errMsg } } } = jsonResponse;
  if (status === 'Success') {
    const { resp: { result: { responseMsg } } } = jsonResponse;
    jsonResponse.responseStatus = true;
    jsonResponse.message = responseMsg;
  } else {
    jsonResponse.responseStatus = false;
    jsonResponse.message = errMsg;
  }*/
  return jsonResponse;
};

const handleNetworkError = async (responseError) => {
  if (responseError.name !== 'AbortError') {
    store.dispatch(loaderSet(false));
    store.dispatch(notifySet({
      type: 'error',
      message: 'Network request error. Please try again.',
    }));
  }
};


const generateHasuraAPI = async (query) => {
  if(store.getState().user?.user?.tokenExpirationInstant < +new Date()){
    const reqData = {
      "token": store.getState().user?.user?.token,
      "refreshToken": store.getState().user?.user?.refreshToken
    };
    try {
      await RefreshToken(reqData);
    }
    catch (e) {
      return userLogout();
    }
  }

  return fetch(process.env.HASURA_QUERY_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${store.getState().user?.user?.token}`,
    },
    body: JSON.stringify(query)
  }).then(async (response) => await validateResponse(response))
      .catch((error) => handleNetworkError(error));
};

export const RefreshToken = async (data) => {
  const res = await fetch(`${process.env.API_BASE_URL}/refresh-token`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: process.env.API_KEY,
      "x-application-id": process.env.APPLICATION_ID
    },
    body: JSON.stringify(data)
  });
  const {result: {user}} = await validateResponse(res);
  if(user.token){
    const localUser = store.getState().user;
    localUser.user.token = user.token;
    localUser.user.refreshToken = user.refreshToken;
    localUser.user.tokenExpirationInstant = user.tokenExpirationInstant;
    store.dispatch(userSet(localUser));
  }else{
    throw new Error('unable to set new token');
  }
};

export const sendOTP = async (data) => fetch(`${process.env.OTP_API_URL}/dst/sendOTP?${queryString(data)}`, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Basic ${base64.encode(`${process.env.HTTP_BASIC_USER}:${process.env.HTTP_BASIC_PASS}`)}`,
  },
}).then(async (response) => await validateResponse(response))
  .catch((error) => handleNetworkError(error));

export const verifyOTP = async (data) => fetch(`${process.env.OTP_API_URL}/dst/verifyOTP?${queryString(data)}`, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Basic ${base64.encode(`${process.env.HTTP_BASIC_USER}:${process.env.HTTP_BASIC_PASS}`)}`,
  },
}).then(async (response) => await validateResponse(response))
  .catch((error) => handleNetworkError(error));

export const ITIlogin = (data) => fetch(`${process.env.API_BASE_URL}/login/pin`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // Authorization: `Basic ${base64.encode(`${process.env.HTTP_BASIC_USER}:${process.env.HTTP_BASIC_PASS}`)}`,
    Authorization: process.env.API_KEY,
  },
  body: JSON.stringify(data)
}).then(async (response) => await validateResponse(response))
    .catch((error) => handleNetworkError(error));

export const ResetPIN = (data) => fetch(`${process.env.API_BASE_URL}/changePin`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: process.env.API_KEY,
    "x-application-id": process.env.APPLICATION_ID
  },
  body: JSON.stringify(data)
}).then(async (response) => await validateResponse(response))
    .catch((error) => handleNetworkError(error));



export const getAcademicCalendarLinks = (data) => {
  const query = {
    query: `query MyQuery($name: String) {
      iti_academic_calendar_link(where: {iti: {name: {_eq: $name}}}, limit: 1) {
        calendar_link
        id
        created_at
      }
    }`,
    "variables": {name: data.itiName}
  };
  return generateHasuraAPI(query);
};

export const getLoggedInITIDetails = (data) => {
  const query = {
    query: `query MyQuery($name: String) {
      principal(where: {iti: {_eq: $name}}, limit: 1) {
        principal_name
        iti
        email_id
        district
        contact_number
      }
    }`,
    "variables": {name: data.itiName}
  };
  return generateHasuraAPI(query);
};

export const getITIsList = () => {
  const query = {
    query: `query {
      iti {
        id
        name
        district
        latitude
        longitude
      }
    }`
  };
  return generateHasuraAPI(query);
};

export const getIndustriesList = () => {
  const query = {
    query: `query {
      industry {
        id
        name
        district
      }
    }`
  };
  return generateHasuraAPI(query);
};

export const createDstMc = (data) => {
  const query = {
    query: `mutation create_dst_mc_meeting($objects: [dst_mc_meeting_insert_input!] = {}) {
      insert_dst_mc_meeting(objects: $objects) {
        returning {
          id
        }
      }
    }`,
    "variables": {objects: data}
  };
  return generateHasuraAPI(query);
};

//todo: need to test this api
export const updateDstMc = (data) => {
  const query = {
    query: `mutation MyMutation($id: bigint = "", $industry_id: Int = 10) {
      update_dst_mc_meeting_by_pk(pk_columns: {id: $id}, _set: {industry_id: $industry_id}) {
        industry_id
        id
      }
    }`,
    "variables": {id: data.id, industry_id: data.industryId}
  };
  return generateHasuraAPI(query);
};

export const deleteDstMc = (data) => {
  const query = {
    query: `mutation ($id: String) {
      delete_dst_mc_meeting_by_pk(id: $id) {
        id
      }
    }`,
    "variables": {id: data.id}
  };
  return generateHasuraAPI(query);
};

//todo: need to test these filtered apis
export const getFilteredTrades = (data) => {
  const query = {
    query: `query ($iti_id: Int) {
      dst_mc_meeting(where: {iti_id: {_eq: $iti_id}, deleted_at: {_is_null: true}}) {
        id
        district
        iti_id
        iti {
          id
          name
        }
        industry {
          id
          name
          district
        }
        batch
        trade
      }
    }`,
    "variables": {iti_id: data.itiId}
  };
  return generateHasuraAPI(query);
};

export const getFilteredBatch = (data) => {
  const query = {
    query: `query ($iti_id: Int, $trade: String) {
      dst_mc_meeting(where: {iti_id: {_eq: $iti_id}, trade: {_eq: $trade}, deleted_at: {_is_null: true}}) {
        id
        district
        iti_id
        iti {
          id
          name
        }
        industry {
          id
          name
          district
        }
        batch
        trade
      }
    }`,
    "variables": {iti_id: data.itiId, trade: data.trade}
  };
  return generateHasuraAPI(query);
};

export const getFilteredIndustry = (data) => {
  const query = {
    query: `query ($iti_id: Int, $trade: String, $batch: String) {
      dst_mc_meeting(where: {iti_id: {_eq: $iti_id}, trade: {_eq: $trade}, batch: {_eq: $batch}, deleted_at: {_is_null: true}}) {
        id
        district
        iti_id
        iti {
          id
          name
        }
        industry {
          id
          name
          district
        }
        batch
        trade
      }
    }`,
    "variables": {iti_id: data.itiId, trade: data.trade, batch: data.batch}
  };
  return generateHasuraAPI(query);
};

export const createNewIndustry = (name,district) => {

  const query = {
    query : `mutation InsertIndustry($name: String = "", $latitude: Float = 0.0, $longitude: Float = 0.0, $district: String = "", $added_by_form: Boolean = true) {
  insert_industry_one(object: {name: $name, latitude: $latitude, longitude: $longitude, district: $district, added_by_form: $added_by_form}) {
    id
    name
  }
}`,
    "variables":{name,district}
  };
  return generateHasuraAPI(query);
};

export const updateDataRelativeToIndustryId  = (data,industry,a) => {
  const obj = {
    id:parseInt(a),
    industry_id:industry?.id,
    trainer_name: data.trainer_name,
    trainer_email: data.trainer_email,
    trainer_contact: data.trainer_contact,
    head_name: data.head_name,
    head_email: data.head_email,
    head_contact: data.head_Contact,
    sup_name: data.sup_name,
    sup_email: data.sup_email,
    sup_contact: data.sup_Contact
  };
  const query = {
    query:`mutation MyMutation($id: bigint = "", $industry_id: Int, $trainer_name: String, $trainer_email: String, $trainer_contact: String, $head_name: String, $head_email: String, $head_contact: String, $sup_name: String, $sup_email: String, $sup_contact: String) {
  update_dst_mc_meeting_by_pk(pk_columns: {id: $id}, _set: {industry_id: $industry_id, trainer_name: $trainer_name, trainer_email: $trainer_email, trainer_contact: $trainer_contact, head_name: $head_name, head_email: $head_email, head_contact: $head_contact, sup_name: $sup_name, sup_email: $sup_email, sup_contact: $sup_contact}) {
       industry_id
    id
    head_name
    head_email
    head_contact
    district
    deleted_at
    created_at
    batch
    instance_id
    iti_id
    mc_information_count
    mc_number
    note
    sup_contact
    sup_email
    sup_name
    trade
    trainer_contact
    trainer_email
    trainer_name
    updated_at
  }
}`,
    "variables": obj
  };
  return generateHasuraAPI(query);
};

export const updateFileUrl  = (url,a,t) => {

  const obj = {
    dst_mc_meeting_id:parseInt(a),
    type:t,
    file_url:url,
    old_data_json:{},
    new_data_json:{}
  };
  const query = {
    query:`mutation UploadDocument($dst_mc_meeting_id: bigint, $type: String, $file_url: String, $new_data_json: jsonb = "{}", $old_data_json: jsonb = "{}") {
  insert_dst_mc_meeting_uploads_one(object: {dst_mc_meeting_id: $dst_mc_meeting_id, type: $type, file_url: $file_url, new_data_json: $new_data_json, old_data_json: $old_data_json}) {
    id
    dst_mc_meeting_id
    type
    file_url
    created_at
    updated_at
  }
}`,
    "variables": obj
  };
  return generateHasuraAPI(query);
};
export const cancelDSTMC  = (data,a) => {
  const localtime = moment().format("YYYY-MM-DD h:mm:ss");
  const obj = {
    id:parseInt(a),
    deleted_at:localtime
  };
  const query = {
    query:`mutation MyMutation($id: bigint!, $deleted_at: timestamptz) {
  update_dst_mc_meeting_by_pk(pk_columns: {id: $id}, _set: {deleted_at: $deleted_at}) {
    industry_id
    id
    head_name
    head_email
    head_contact
    district
    deleted_at
    created_at
    batch
    instance_id
    iti_id
    mc_information_count
    mc_number
    note
    sup_contact
    sup_email
    sup_name
    trade
    trainer_contact
    trainer_email
    trainer_name
    updated_at
    deleted_at
  }
}`,
    "variables": obj
  };
  return generateHasuraAPI(query);
};
