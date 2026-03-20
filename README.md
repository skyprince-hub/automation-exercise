# AutomationExercise Cypress E2E Project with Postman
#### By Cocamas, John Prince M.

## **Project Purpose**
This project is for testing the website **[AutomationExercise](https://automationexercise.com)** using **Cypress** end-to-end testing.  
[include image here]

## **How the test cases are structured and organized**
The test cases were organized from AutomationExercise by folders and similarities. The test cases are grouped by feature area and numbered based on AutomationExercise test case IDs so it is easy to find and maintain.

### **Folder structure and test case mapping**
1. **auth**
   - `register-user.cy.js` → test case 1, test case 2
   - `login.cy.js` → test case 2, test case 3, test case 4
2. **test-cases**
   - `verify-testcases.cy.js` → test case 7
   - `verify-apicases.cy.js`
3. **products**
   - `verify-product.cy.js` → test case 8, 9, 20
   - `add-product.cy.js` → test case 12, 13, 22, 23, 24
   - `place-order.cy.js` → test case 14, 15, 16
   - `remove-products.cy.js` → test case 17
   - `product-category.cy.js` → test case 18, 19
   - `add-review.cy.js` → test case 21
4. **miscellaneous**
   - `contact.cy.js` → test case 6
   - `subscription.cy.js` → test case 10, 11

## **API collection**
A folder was added called **postman** which contains the Postman collection JSON for the API test cases in AutomationExercise.

## **How to Run the Project**
Follow these step-by-step instructions to set up and run the project:

1. **Clone the repository**:  
   ```
   git clone https://github.com/skyprince-hub/automation-exercise.git
   ```

2. **Install dependencies**:  
   npm install

3. **Install Newman (optional, for running Postman API test scripts)**:  
   npm install -g newman

4. **Run Cypress tests in CLI**:  
   npx cypress run

5. **Run Cypress in GUI**:  
  npx cypress open

6. **Run Newman for API tests**:  
   newman run postman/AutomationExercise_APITesting.postman_collection.json