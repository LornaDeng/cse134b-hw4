"use strict";

(function enhanceContactForm() {
  const form = document.querySelector("#contact-form");

  if (!form) {
    return;
  }

  const fields = Array.from(form.querySelectorAll("input:not([type='hidden']), textarea"));
  const comments = form.querySelector("#comments");
  const errorArea = form.querySelector("#error-area");
  const informationArea = form.querySelector("#information-area");
  const counter = form.querySelector("#comments-counter");
  const serializedErrors = form.querySelector("#form-errors-history");
  const editedFields = new Set();
  const visibleErrorFields = new Set();
  const form_errors = [];
  let invalidFieldsThisAttempt = null;

  function validationMessage(field) {
    field.setCustomValidity("");

    if (field.validity.valueMissing) {
      return `${field.dataset.label} is required.`;
    }

    if (field.validity.typeMismatch) {
      return "Enter an email address in a format such as name@example.com.";
    }

    if (field.validity.tooShort) {
      return `${field.dataset.label} must contain at least ${field.minLength} characters.`;
    }

    return "";
  }

  function validateField(field) {
    const message = validationMessage(field);
    field.setCustomValidity(message);
    field.classList.toggle("field-invalid", Boolean(message));
    field.classList.toggle("field-valid", !message && field.value.length > 0);
    return message;
  }

  function renderErrors() {
    let hasVisibleError = false;

    fields.forEach(function (field) {
      const output = document.querySelector(`#${field.id}-error`);
      const message = visibleErrorFields.has(field) ? validateField(field) : "";
      output.textContent = message;
      output.hidden = !message;
      hasVisibleError = hasVisibleError || Boolean(message);
    });

    errorArea.hidden = !hasVisibleError;
  }

  function updateCharacterCount() {
    const limit = comments.maxLength;
    const remaining = limit - comments.value.length;
    const warningThreshold = 100;

    informationArea.hidden = false;
    informationArea.classList.toggle("warning", remaining <= warningThreshold);

    if (remaining === 0) {
      counter.textContent = "Character limit reached. No characters remaining.";
    } else if (remaining <= warningThreshold) {
      counter.textContent = `Approaching the character limit: ${remaining} characters remaining.`;
    } else {
      counter.textContent = `${remaining} characters remaining.`;
    }
  }

  fields.forEach(function (field) {
    field.addEventListener("input", function () {
      editedFields.add(field);

      if (visibleErrorFields.has(field)) {
        renderErrors();
      } else {
        field.classList.toggle("field-valid", field.validity.valid && field.value.length > 0);
      }

      if (field === comments) {
        updateCharacterCount();
      }
    });

    field.addEventListener("blur", function () {
      if (editedFields.has(field)) {
        visibleErrorFields.add(field);
        renderErrors();
      }
    });
  });

  form.addEventListener("invalid", function (event) {
    const field = event.target;

    if (!fields.includes(field)) {
      return;
    }

    visibleErrorFields.add(field);
    const message = validateField(field);
    renderErrors();

    if (!invalidFieldsThisAttempt) {
      invalidFieldsThisAttempt = new Set();
      window.setTimeout(function () {
        invalidFieldsThisAttempt = null;
      }, 0);
    }

    if (!invalidFieldsThisAttempt.has(field.name)) {
      invalidFieldsThisAttempt.add(field.name);
      form_errors.push({
        field: field.name,
        message: message
      });
    }
  }, true);

  form.addEventListener("submit", function () {
    serializedErrors.value = JSON.stringify(form_errors);
  });

  window.addEventListener("pageshow", updateCharacterCount);
  updateCharacterCount();
}());
