import { set, unset, PatchEvent } from 'sanity';
import { TextInput } from '@sanity/ui';
import { uuid } from '@sanity/uuid';
import get from 'lodash.get';
import React, { forwardRef, useCallback } from 'react';

const PlaceholderStringInput = forwardRef((props, ref) => {
  const {
    document,
    onBlur,
    onChange,
    readOnly,
    type,
    value,
  } = props

  const handleChange = useCallback(
    // useCallback will help with performance
    (event) => {
      const inputValue = event.currentTarget.value; // get current value

      // if the value exists, set the data, if not, unset the data
      onChange(PatchEvent.from(inputValue ? set(inputValue) : unset()));
    }, [ onChange ]);

  const proxyValue = get(document, type?.options?.field)

  const inputId = uuid()

  return (
    <TextInput
      defaultValue={ value }
      id={ inputId }
      onBlur={ onBlur }
      onChange={ handleChange }
      placeholder={ proxyValue }
      readOnly={ readOnly }
      ref={ ref }
      title={ type?.title }
    />
  )
})

export default PlaceholderStringInput