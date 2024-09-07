import React, { useState, useEffect, useRef } from "react";
import SelectItem from "./SelectItem.js";
export default function Technologies({
  error,
  value,
  selectedTechnologies,
  onChange
}) {
  const [toggleAdd, setToggleAdd] = useState(false);
  const [technologies, setTechnologies] = useState([]);
  const selectTech = useRef(null);
  useEffect(() => {
    fetchTechnologies();
  }, []);
  useEffect(() => {
    if (technologies.length === 0) {
      return;
    }
    if (value.length > 0) {
      let technologyToAdd = [];
      for (let element of value) {
        const foundTechnology = technologies.find(technology => technology.id == element.id);
        if (!foundTechnology) {
          return;
        }
        technologyToAdd.push(foundTechnology);
      }
      onChange(technologyToAdd);
    }
  }, [technologies]);
  const fetchTechnologies = async () => {
    const response = await fetch("/technology");
    const technologies = await response.json();
    setTechnologies(technologies);
  };
  const setTechnologyOptions = technologies => {
    const options = [];
    technologies.forEach(technology => {
      if (selectedTechnologies.find(selectedTechnology => selectedTechnology.id == technology.id)) {
        return;
      }
      options.push( /*#__PURE__*/React.createElement("option", {
        value: technology.id
      }, technology.name));
    });
    if (options.length == 0) {
      options.push( /*#__PURE__*/React.createElement("option", {
        value: ""
      }, "aucune technologie"));
    }
    return options;
  };
  const addTechnology = () => {
    if (selectTech.current.value == "") {
      return;
    }
    const technology = technologies.find(technology => technology.id == selectTech.current.value);
    onChange([...selectedTechnologies, technology]);
  };
  const removeTechnology = id => {
    onChange(selectedTechnologies.filter(technology => technology.id != id));
  };
  const showSelectedTechnologies = technologies => {
    return technologies.map(technology => {
      return /*#__PURE__*/React.createElement(SelectItem, {
        id: technology.id,
        name: technology.name,
        icon: technology.svg,
        onClick: () => removeTechnology(technology.id)
      });
    });
  };
  const onHandleClick = () => {
    setToggleAdd(!toggleAdd);
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "container",
    className: "flex flex-col gap-2 mb-2 w-full text-sm font-medium"
  }, "technologies"), !toggleAdd && /*#__PURE__*/React.createElement("button", {
    onClick: onHandleClick,
    className: "hover:text-button"
  }, "+ ajouter une technologie"), toggleAdd && /*#__PURE__*/React.createElement("div", {
    className: "flex gap-4  max-sm:flex-col"
  }, /*#__PURE__*/React.createElement("select", {
    ref: selectTech,
    name: "technologie",
    id: "technologie",
    className: "max-w-40 w-full h-10 bg-primary border-stroke border-[1px] rounded-md px-4"
  }, setTechnologyOptions(technologies)), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    className: "hover:text-button  transition-colors duration-200 ease-in-out",
    onClick: () => {
      addTechnology();
      onHandleClick();
    }
  }, "confirmer"), /*#__PURE__*/React.createElement("button", {
    className: "hover:text-button opacity-50 transition-colors duration-200 ease-in-out",
    onClick: onHandleClick
  }, "annuler"))), selectedTechnologies && /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap w-full gap-2 mt-4"
  }, showSelectedTechnologies(selectedTechnologies)), error && /*#__PURE__*/React.createElement("small", {
    className: "text-red "
  }, "Vous devez ajouter au moins une technologie"));
}