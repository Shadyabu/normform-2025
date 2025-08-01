import {LockIcon} from '@sanity/icons'
import {Box, Text, TextInput, Tooltip} from '@sanity/ui'
import {uuid} from '@sanity/uuid'
import get from 'lodash.get'
import React, {forwardRef} from 'react'

// TODO: type correctly

const ProxyString = forwardRef((props, ref) => {
  const {
    compareValue, // Value to check for "edited" functionality
    document,
    markers,
    onFocus,
    onBlur,
    placeholder,
    presence,
    readOnly,
    type,
  } = props

  const path = type?.options?.field
  const proxyValue = get(document, path)

  const inputId = uuid()

  return (
      <Tooltip
        content={
          <Box padding={2}>
            <Text muted size={1}>
              This value is set in Shopify (<code>{path}</code>)
            </Text>
          </Box>
        }
        portal
      >
        <TextInput
          iconRight={LockIcon}
          id={inputId}
          onBlur={onBlur}
          onFocus={onFocus}
          placeholder={placeholder}
          readOnly={true}
          ref={ref}
          value={proxyValue}
        />
      </Tooltip>
  )
})

export default ProxyString;