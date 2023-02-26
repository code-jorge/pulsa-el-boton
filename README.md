## Pulsa El Botón

[![Netlify Status](https://api.netlify.com/api/v1/badges/dde074c6-d75f-4468-8475-20556f9abcc1/deploy-status)](https://app.netlify.com/sites/pulsa-el-boton/deploys)

### Dilemma Structure

| Field       | Type             | Meaning              |
|-------------|------------------|----------------------|
| id          | ObjectId         | The identifier       |
| date        | Date             | The date             |
| title       | string           | The title            |
| type        | string           | Type of dilemma      |
| category    | string           | Category             |
| tags        | Array<string>    | Tags                 |
| positive    | string           | Positive outcome     |
| negative    | string           | Negative outcome     |
| slug        | string           | URL Fragment         |


### Dilemma vote structure

| Field       | Type             | Meaning              |
|-------------|------------------|----------------------|
| id          | ObjectId         | The identifier       |
| dilemma     | → Dilemma        | The dilemma's id     |
| choice      | string           | The choice           |
| date        | Date             | When                 |
| ip          | string           | Client's IP          |

### Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).