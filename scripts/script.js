import "./consts.js";
import {
    bodyElement,
    containerElement,
    headerElement,
    mainElement,
} from "./consts.js";

headerElement.textContent = "Header ";

mainElement.textContent = "Main ";

containerElement.appendChild(headerElement);
containerElement.appendChild(mainElement);

bodyElement.appendChild(containerElement);
