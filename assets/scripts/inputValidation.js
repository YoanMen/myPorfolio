function name(value) {
  let error = null;

  if (value.length === 0) {
    error = "Le nom ne doit pas être vide";
  }
  if (value.length > 60) {
    error = "Le nom est trop long 60 caractères maximum";
  }

  return error;
}

function email(value) {
  let error = null;

  if (value.length === 0) {
    error = "L'adresse e-mail ne doit pas être vide";
  }
  if (
    value.length > 0 &&
    !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)
  ) {
    error = "L'adresse e-mail est n'est pas valide";
  }
  if (value.length > 320) {
    error = "L'adresse e-mail est trop longue 320 caractères maximum";
  }

  return error;
}

function message(value) {
  let error = null;

  if (value.length === 0) {
    error = "Le message ne doit pas être vide";
  }
  if (value.length > 0 && value.length <= 20) {
    error = "Le message ne doit faire au minimum 20 caractères";
  }
  if (value.length > 1000) {
    error = "Le message est trop long 1000 caractères maximum";
  }

  return error;
}

function about(value) {
  let error = null;
  const cleanedValue = value.replace(/<[^>]*>?/gm, '').length;

  if (cleanedValue === 0) {
    error = "Le contenu ne doit pas être vide";
  }

  if (cleanedValue > 1000) {
    error = "Le contenu ne doit pas faire plus de 1000 caractères";
  }

  return error;
}

export const inputValidation = {
  name, email, message, about
}