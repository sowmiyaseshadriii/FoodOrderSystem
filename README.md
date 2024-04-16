# FoodOrderSystem
Building a simple web page for a food ordering company. 

# Navigation Bar:
Add Route Handlers (Layout.tsx):
 - Implement route handlers for /menu, /queue, and /order using React Router.

# Menu Page:
Created Menu Page Component (MenuPage):
 - Implemented the layout with food images and the dropdown filter.
   Created a dropdown component with options: All, Rice, Noodle, Side dishes.
   Implemented filtering logic to display images based on the selected option.
   MenuPage
   <img width="1429" alt="MenuPage" src="https://github.com/sowmiyaseshadriii/FoodOrderSystem/assets/17636011/b6479747-49f9-447f-af4a-2ff87739d338">

# Order Page:
Created Order Page Component (OrderPage):
 - Implemented the form layout with dropdowns, quantity input, and checkbox.
 - Implemented basic field validations for item name (dropdown), quantity (max 5), and checkbox.
  only a maximum of 2 food items can be submitted per form.
 - Implemented a submit button to send the form data.
   used method POST '/order' endpoint to send the order.  Handle the response to display a green banner with the queue number upon successful submission.
   OrderPage
   <img width="1424" alt="OrderPage" src="https://github.com/sowmiyaseshadriii/FoodOrderSystem/assets/17636011/38e1548c-4a7e-481c-a0cf-fe9093b95721">
   
   When FormValidation OrderPage
   <img width="1412" alt="FormValidationOrderPage" src="https://github.com/sowmiyaseshadriii/FoodOrderSystem/assets/17636011/605d33e7-04c9-4f9a-a720-edfec108659b">

   When SelectedItems OrderPage
   <img width="1396" alt="OrderPlacedPage" src="https://github.com/sowmiyaseshadriii/FoodOrderSystem/assets/17636011/3ad66860-5a40-45cd-8a21-dae6aea23377">

# Queue Page:
Create Queue Page Component (QueuePage):
  - Implemented the layout to display "Collection" and "Preparing" components.
  - To fetch Queue Numbers used method GET '/queue-numbers' endpoint to fetch queue numbers for both "Collection" and "Preparing" components.
    and displayed the fetched queue numbers accordingly.
  - Implemented Refresh Button to simulate moving the queue.
    Upon clicking the refresh button, fetch queue numbers again to update the view.
    QueuePage
    <img width="1402" alt="QueuePage" src="https://github.com/sowmiyaseshadriii/FoodOrderSystem/assets/17636011/437150cf-019e-4714-bc58-e1b10b8ab810">

## Getting Started

First, install all dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

List of pages given:

- http://localhost:3000/menu
- http://localhost:3000/order
- http://localhost:3000/queue

### API endpoints
To launch the backend that hosts the API endpoints, you can either use this [dockerfile](/backend/Dockerfile), or run the [jar](/backend/xyz-company-0.0.1-SNAPSHOT.jar) using Java.



