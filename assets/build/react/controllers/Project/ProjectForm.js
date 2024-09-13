import React, { useState, useEffect } from "react";
import InputField from "../InputField.js";
import QuillEditor from "../QuillEditor.js";
import { inputValidation } from "../../../../scripts/inputValidation.js";
import { showNotification } from "../showNotification.js";
import Switch from "../ToggleSwitch.js";
import Technologies from "./Technologies.js";
import ExternalLinks from "./ExternalLinks.js";
export default function ProjectForm({
  update = false,
  csrf_token,
  project = {
    name: "",
    slug: "",
    isVisible: false,
    content: "",
    links: [],
    technologies: []
  }
}) {
  const [errors, setErrors] = useState({
    name: null,
    slug: null,
    content: null,
    technologies: null
  });
  const [disableForm, setDisableForm] = useState(false);
  const [isSaved, setIsSaved] = useState(true);
  const [informations, setInformations] = useState({
    name: project.name,
    slug: project.slug,
    isVisible: project.isVisible,
    content: project.content,
    links: project.links,
    technologies: project.technologies
  });
  let editBtn = null;
  useEffect(() => {
    const beforeUnloadHandler = event => {
      if (isSaved) {
        return;
      }
      event.preventDefault();
      event.returnValue = true;
    };
    window.addEventListener("beforeunload", beforeUnloadHandler);
    return () => {
      window.removeEventListener("beforeunload", beforeUnloadHandler);
    };
  }, [isSaved]);
  useEffect(() => {
    const saveBtn = document.getElementById("saveBtn");
    editBtn = document.getElementById("editBtn");
    if (saveBtn) {
      saveBtn.addEventListener("click", handleSave);
    }
    if (editBtn) {
      editBtn.addEventListener("click", handleEditAndContinue);
    }
    return () => {
      if (saveBtn) {
        saveBtn.removeEventListener("click", handleSave);
      }
      if (editBtn) {
        editBtn.removeEventListener("click", handleEditAndContinue);
      }
    };
  }, [informations]);
  const onHandleName = value => {
    value = value.trimLeft();
    setErrors({
      ...errors,
      name: inputValidation.checkLength(value, 60),
      slug: null
    });
    setInformations({
      ...informations,
      name: value,
      slug: inputValidation.string_to_slug(value)
    });
    setIsSaved(false);
  };
  const onHandleSlug = value => {
    value = inputValidation.string_to_slug(value);
    setErrors({
      ...errors,
      slug: inputValidation.checkLength(value, 100)
    });
    setInformations({
      ...informations,
      slug: value
    });
    setIsSaved(false);
  };
  const onHandleIsVisible = value => {
    setInformations({
      ...informations,
      isVisible: value
    });
    setIsSaved(false);
  };
  const onHandleContent = value => {
    setInformations({
      ...informations,
      content: value
    });
    setIsSaved(false);
  };
  const onHandleTechnologies = updatedTechnologies => {
    setErrors({
      ...errors,
      technologies: null
    });
    setInformations({
      ...informations,
      technologies: updatedTechnologies
    });
  };
  const onHandleLinks = updatedLinks => {
    setInformations({
      ...informations,
      links: updatedLinks
    });
  };
  const handleEditAndContinue = event => handleSave(event, true);
  const handleSave = async (event, updating = false) => {
    event.preventDefault();
    const nameError = inputValidation.checkLength(informations.name.trim(), 60);
    const slugError = inputValidation.checkLength(informations.slug, 100);
    const contentError = informations.content.length === 0 ? "Le contenu ne doit pas être vide" : null;
    const technologiesError = informations.technologies.length === 0 ? true : null;
    setErrors({
      ...errors,
      name: nameError,
      slug: slugError,
      content: contentError,
      technologies: technologiesError
    });
    if (nameError || slugError || contentError || technologiesError) {
      return;
    }
    setIsSaved(true);
    saveBtn.disabled = true;
    if (editBtn) editBtn.disabled = true;
    setDisableForm(true);
    await fetch(`/admin/project/${update ? project.id : "create"}`, {
      method: "POST",
      body: JSON.stringify({
        isVisible: informations.isVisible,
        name: informations.name,
        slug: informations.slug,
        content: informations.content,
        links: informations.links,
        technologies: informations.technologies,
        csrf_token: csrf_token
      })
    }).then(res => res.json()).then(data => {
      if (data.success) {
        if (updating) {
          window.location.reload();
          return;
        }
        document.location.href = "/admin/project/";
        return;
      }
      setDisableForm(false);
      saveBtn.disabled = false;
      if (editBtn) editBtn.disabled = false;
      return showNotification(data.error);
    }).catch(error => {
      showNotification("erreur : " + error);
      setDisableForm(false);
      saveBtn.disabled = false;
      if (editBtn) editBtn.disabled = false;
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "font-eudoxus flex flex-col gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2 max-sm:flex-col-reverse justify-between"
  }, /*#__PURE__*/React.createElement("label", {
    className: "flex flex-col gap-2 justify-start w-fit",
    htmlFor: "visible"
  }, "visible", /*#__PURE__*/React.createElement(Switch, {
    name: "visible",
    id: "visible",
    label: "visible",
    className: "mt-1",
    onChange: onHandleIsVisible,
    checked: informations.isVisible,
    disabled: disableForm
  })), " ", /*#__PURE__*/React.createElement("a", {
    target: "_blank",
    ariaLabel: "aper\xE7u de la page",
    href: "/projets/" + informations.slug,
    className: "mr-2 hover:text-white transition-colors duration-150 max-sm:text-right"
  }, "aper\xE7u de la page")), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-4 max-sm:flex-col"
  }, /*#__PURE__*/React.createElement(InputField, {
    label: "nom",
    id: "name",
    className: "max-w-80",
    error: errors.name,
    onChange: onHandleName,
    value: informations.name,
    disabled: disableForm
  }), /*#__PURE__*/React.createElement(InputField, {
    label: "slug",
    id: "slug",
    className: "max-w-80",
    error: errors.slug,
    onChange: onHandleSlug,
    value: informations.slug,
    disabled: disableForm
  })), /*#__PURE__*/React.createElement(Technologies, {
    error: errors.technologies,
    selectedTechnologies: informations.technologies,
    onChange: onHandleTechnologies,
    value: informations.technologies
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "container",
    className: "flex flex-col gap-2 mb-2 w-full text-sm font-medium"
  }, "article"), /*#__PURE__*/React.createElement(QuillEditor, {
    disabled: disableForm,
    onChange: onHandleContent,
    value: informations.content
  }), errors.content && /*#__PURE__*/React.createElement("small", {
    className: "text-red"
  }, errors.content)), /*#__PURE__*/React.createElement(ExternalLinks, {
    selectedLinks: informations.links,
    onChange: onHandleLinks,
    value: informations.links
  }));
}