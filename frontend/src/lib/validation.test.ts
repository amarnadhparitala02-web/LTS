import { describe, expect, it } from 'vitest'
import { emptyForm, validateLead, type LeadForm } from './validation'

const valid: LeadForm = {
  ...emptyForm,
  name: 'Asha Rao',
  email: 'asha@example.com',
  message: 'We need a new website for our clinic.',
  consent: true,
}

describe('validateLead', () => {
  it('accepts a valid form', () => {
    expect(validateLead(valid)).toEqual({})
  })

  it('flags every required field on an empty form', () => {
    expect(Object.keys(validateLead(emptyForm)).sort()).toEqual(['consent', 'email', 'message', 'name'])
  })

  it('rejects a malformed email', () => {
    expect(validateLead({ ...valid, email: 'asha@' }).email).toBeDefined()
  })

  it('treats phone as optional but validates it when present', () => {
    expect(validateLead({ ...valid, phone: '' }).phone).toBeUndefined()
    expect(validateLead({ ...valid, phone: 'abc' }).phone).toBeDefined()
    expect(validateLead({ ...valid, phone: '+91 98765 43210' }).phone).toBeUndefined()
  })

  it('requires consent', () => {
    expect(validateLead({ ...valid, consent: false }).consent).toBeDefined()
  })
})
