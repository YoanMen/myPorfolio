import React, { useState, useEffect, useRef } from "react";
import SelectItem from "./SelectItem.js";
import InputField from "../InputField.js";
import { inputValidation } from "../../../../scripts/inputValidation.js";

export default function ExternalLink({ value, onChange, selectedLinks }) {
  const [toggleAdd, setToggleAdd] = useState(false);
  const [icons, setIcons] = useState([]);
  const selectIcon = useRef(null);
  const [url, setUrl] = useState("");
  const [errors, setErrors] = useState({ url: null });

  useEffect(() => {
    fetchIcons();
  }, []);

  useEffect(() => {
    if (icons.length === 0) {
      return;
    }

    if (value) {
      let linksToAdd = [];

      for (let link of value) {
        const found = icons.find((icon) => icon.id == link.id);

        if (!found) {
          return;
        }

        linksToAdd.push({
          id: found.id,
          name: found.name,
          svg: found.svg,
          url: link.url,
        });
      }

      onChange(linksToAdd);
    }
  }, [icons]);

  const fetchIcons = async () => {
    const response = await fetch("/icons");
    const icons = await response.json();
    setIcons(icons);
  };

  const setIconsOption = (icons) => {
    const options = [];

    icons.forEach((icon) => {
      if (selectedLinks.find((link) => link.id == icon.id)) {
        return;
      }
      options.push(<option value={icon.id}>{icon.name}</option>);
    });

    if (options.length == 0) {
      options.push(<option value="">aucune icône</option>);
    }
    return options;
  };

  const addExternalLink = () => {
    if (selectIcon.current.value == "") {
      return;
    }

    const urlError = inputValidation.link(url.trim());

    if (urlError) {
      return;
    }

    const icon = icons.find((icon) => icon.id == selectIcon.current.value);

    onChange([
      ...selectedLinks,
      { id: icon.id, name: icon.name, svg: icon.svg, url: url },
    ]);
  };

  const removeLink = (id) => {
    onChange(selectedLinks.filter((link) => link.id != id));
  };

  const onHandleClick = () => {
    setUrl("");
    setErrors({ url: null });
    setToggleAdd(!toggleAdd);
  };

  const onHandleUrlChange = (value) => {
    value = value.trim();
    setErrors({ ...errors, url: inputValidation.link(value) });

    setUrl(value);
  };

  const showLinks = (links) => {
    return links.map((externalLink) => {
      return (
        <SelectItem
          id={externalLink.id}
          name={externalLink.url}
          icon={externalLink.svg}
          onClick={() => removeLink(externalLink.id)}
        />
      );
    });
  };

  return (
    <div>
      <label
        htmlFor="container"
        className="flex flex-col gap-2 mb-2 w-full text-sm font-medium">
        liens externe
      </label>

      {!toggleAdd && (
        <button onClick={onHandleClick} className="hover:text-button">
          + ajouter un lien externe
        </button>
      )}
      {toggleAdd && (
        <div className="flex gap-4 max-sm:flex-col">
          <select
            ref={selectIcon}
            name="externalLink"
            id="externalLink"
            className="max-w-40 w-full h-10 bg-primary border-stroke border-[1px] rounded-md px-4">
            {setIconsOption(icons)}
          </select>
          <InputField
            label=""
            id="name"
            className="max-w-80 mb-0"
            error={errors.url}
            onChange={onHandleUrlChange}
            value={url}
          />
          <div className="flex gap-2 mb-auto mt-2">
            <button
              className="hover:text-button  transition-colors duration-200 ease-in-out"
              onClick={() => {
                addExternalLink();
                onHandleClick();
              }}>
              confirmer
            </button>
            <button
              className="hover:text-button opacity-50 transition-colors duration-200 ease-in-out"
              onClick={onHandleClick}>
              annuler
            </button>
          </div>
        </div>
      )}
      {selectedLinks && (
        <div className="flex flex-wrap w-full gap-2 mt-4">
          {showLinks(selectedLinks)}
        </div>
      )}
    </div>
  );
}
