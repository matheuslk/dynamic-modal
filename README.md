# Dynamic Modal

#### Inspired by the modal system of the Ant Design library, this project demonstrates how to create dynamic components in Angular. It focuses on a custom modal component which allows the passage of a content component that may or may not contain a footer component.

#### For a better understanding, imagine you are creating your Modal component with a form and some buttons in the footer that will interact with this form. You would like the content part of the modal (the form in this case) to be rendered separately from the footer because the content part may contain unique spacings and styles in the Modal, just like the footer. Thus, we have two intimate components that need to communicate but should be rendered in separate parts in the Modal. To achieve this scenario, we create a content component (let's call it ModalContentComponent) containing the form along with a template containing the footer. To achieve this separation at the time of rendering these two elements, we will use a directive that will pass the footer template to the Modal component, giving it the ability to render the footer in a different location from the content. Thus, the ModalContentComponent contains the content of the Modal (form) and also the footer template. Since these two elements are in the same component, they can communicate in a simplified way, and we can also perform multiple combinations between footers and contents, allowing for better component reusability, simply by creating different content components containing the desired combinations. To observe this case in practice, observe the behavior of the "UserFormModalContentComponent".

#### Written with:

<div style="
  display: flex;
  column-gap: 12px;
">
  <img src="https://user-images.githubusercontent.com/25181517/183890595-779a7e64-3f43-4634-bad2-eceef4e80268.png" height="36px"/>
  <img src="https://user-images.githubusercontent.com/25181517/183890598-19a0ac2d-e88a-4005-a8df-1ee36782fde1.png" height="36px"/>
  
</div>

## Installation

```bash
npm install
```

## Usage

```bash
npm start
```
