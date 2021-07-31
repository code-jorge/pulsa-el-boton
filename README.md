## Pulsa El Botón

### Dilemma Structure

| Field       | Type             | Meaning              |
|-------------|------------------|----------------------|
| id          | ObjectId         | The identifier       |
| type        | string           | Type of dilemma      |
| category    | string           | Category             |
| tags        | Array<string>    | Tags                 |
| positive    | string           | Positive outcome     |
| negative    | string           | Negative outcome     |
| slug        | string           | URL Fragment         |


### Dilemma vote structure

| Field       | Type             | Meaning              |
|-------------|------------------|----------------------|
| id          | ObjectId         | The identifier       |
| dilemma     | Dilemma (_id)    | The dilemma's id     |
| choice      | string           | The choice           |
| date        | Date             | When                 |
| ip          | string           | Client's IP          |

### Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
