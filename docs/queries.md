## Add Trainee

```graphql
mutation insertTrainer($trainee: trainee_insert_input!) {
  insert_trainee_one(object: $trainee, on_conflict: {update_columns: [DOB, affiliationType, batch, dateOfAdmission, father, gender, industry, iti, mother, name, registrationNumber, tradeName], constraint: trainee_registrationNumber_key, where: {}}) {
    DOB
    affiliationType
  }
}
```


```json
{
  "trainee": {
        "DOB": "1996-12-09",
        "affiliationType": "NCVT",
        "batch": "2021-2022",
        "dateOfAdmission": "2022-05-12",
        "father": "ABC",
        "gender": "F",
        "id": 47,
        "industry": 185,
        "iti": 16432,
        "mother": "XYZ",
        "name": "DINESH KUMAR",
        "registrationNumber": "ICA172217701926",
        "statusFlag": 0,
        "tradeName": "WELDER"
      }
}
```

## Get ITI from location
```graphq
query MyQuery($name: String!) {
  iti(where: {name: {_eq: $name}}){
    id
    name
  }
}
```

```json
{
  "name": "GITI Ambala City"
}
```

## Get Industry from ITI
```graphql
query MyQuery($name: String!) {
  industry(where: {name: {_eq: $name}}) {
    id
  }
}
```

```json
{
  "name": "Hotel Palavi"
}
```


