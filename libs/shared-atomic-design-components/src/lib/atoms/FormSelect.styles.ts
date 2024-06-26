export const formSelectStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    padding: '13px',
    color: state.isFocused ? 'black' : '',
    backgroundColor: state.isFocused ? '#dadada' : '',
    '&:active': {
      color: 'black',
      backgroundColor: '#dadada',
    },
  }),
  clearIndicator: (provided: any) => ({
    ...provided,
    svg: {
      margin: '0 0.1rem',
    },
  }),
  dropdownIndicator: (provided: any, state: any) => ({
    ...provided,
    transition: 'ease-in-out all 0.2s',
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'none',
    svg: {
      margin: '0 0.1rem',
    },
  }),
  control: (provided: any, state: any) => ({
    ...provided,
    borderColor: state.isFocused ? 'black' : '#A0A0A0',
    minHeight: '48px',
    boxShadow: 'inset 0 2px 6px rgba(178, 180, 181, 0.3)',
    '&:hover': {
      borderColor: 'black'
    },
  }),
  multiValue: (provided: any) => ({
    ...provided,
    color: '#FFB298',
    borderRadius: '4px',
    backgroundColor: '#FFEAE2',
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    fontSize: 'inherit',
    color: '#FF7D55',
  }),
  placeholder: (provided: any) => ({
    ...provided,
    fontStyle: 'italic',
    color: '#a0a0a0',
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    svg: {
      padding: '0 2px',
    },
  }),
  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
}
