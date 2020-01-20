<script>
  import { createEventDispatcher } from "svelte";
  import { textPresent, onePresent, minimumLength, validEmail } from "../helpers/validation.js"
  import TextInput from '../UI/TextInput.svelte';
  import Button    from '../UI/Button.svelte';

  let title = "";
  let subtitle = "";
  let address = "";
  let email = "";
  let emailValid = false
  let description = "";
  let descriptionValid = false
  let imageUrl = "";
  let formIsValid = false;

  $: descriptionValid = minimumLength(description, 4)
  $: emailValid = validEmail(email)
  $: checkFormValidity([emailValid, descriptionValid])

  // const dispatch = createEventDispatcher; Missing () !!!!!
  const dispatch = createEventDispatcher();

  function submitForm() {
    const meetup = {
      title: title,
      subtitle: subtitle,
      address: address,
      email: email,
      description: description,
      imageUrl: imageUrl,
    };

    if(formIsValid){
      console.log("dispatch save event")
      dispatch("save", meetup)
    } else {
      console.log("Form is not valid")
    }
  }

  function checkFormValidity(fields){
    formIsValid = true;
    fields.forEach(field => {
      if(!field) {
        formIsValid = false;
      }
    })
  }

</script>

<style>
  form {
    max-width: 100%;
  }
</style>


<form on:submit|preventDefault={() => submitForm() }>
  <TextInput
    id="title"
    label="Title"
    value={title}
    valid={textPresent(title)}
    validityMessage={"Title is required"}
    on:input={event => (title = event.target.value)} />
  <TextInput
    id="subtitle"
    label="Subtitle"
    value={subtitle}
    valid={textPresent(subtitle)}
    validityMessage={"Subtitle is required"}
    on:input={event => (subtitle = event.target.value)} />
  <TextInput
    id="address"
    label="Address"
    value={address}
    valid={onePresent(address)}
    validityMessage={"Address must contain a 1"}
    on:input={event => (address = event.target.value)} />
  <TextInput
    id="imageUrl"
    label="Image URL"
    value={imageUrl}
    valid={textPresent(imageUrl)}
    validityMessage={"image url is required"}
    on:input={event => (imageUrl = event.target.value)} />
  <TextInput
    id="email"
    label="E-Mail"
    type="email"
    value={email}
    valid={emailValid}
    validityMessage="Email must be a .com"
    on:input={event => (email = event.target.value)} />
  <TextInput
    id="description"
    label="Description"
    controlType="textarea"
    value={description}
    valid={descriptionValid}
    validityMessage="Description minumum is 4 characters"
    on:input={event => (description = event.target.value)} />
  <Button type="submit" disabled={!formIsValid}>Save</Button>
  <Button on:click={() => dispatch('cancel')}>Cancel</Button>
</form>
