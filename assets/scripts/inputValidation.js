import isSvg from 'is-svg';



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

function checkLength(value, max = 60) {
  let error = null;

  if (value.length === 0) {
    error = "Ne doit pas être vide";
  }
  if (value.length > max) {
    error = "doit être entre 1 et " + max + " caractères";
  }

  return error;
}

function checkIsSVG(value) {
  return isSvg(value) ? null : "Le fichier doit être un SVG";
}

function link(value) {
  let error = null;

  if (value.length === 0) {
    error = "Le lien ne doit pas être vide";
  }
  if (value.length > 200) {
    error = "Le lien est trop long 200 caractères maximum";
  }

  if (!/^https?:/.test(value)) {
    error = "Le lien doit commencer par http ou https";
  }
  return error;
}

function string_to_slug(str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaeeeeiiiioooouuuunc------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
}

export const inputValidation = {
  name, email, message, about, checkLength, checkIsSVG, link, string_to_slug
}