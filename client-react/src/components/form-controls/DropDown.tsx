import React, { useContext } from 'react';
import { Dropdown as OfficeDropdown, IDropdownProps, IDropdownOption, IDropdownStyles } from 'office-ui-fabric-react/lib/Dropdown';
import { FieldProps } from 'formik';
import get from 'lodash-es/get';
import { ThemeContext } from '../../ThemeContext';
import { DropDownStyles } from '../../theme/CustomOfficeFabric/AzurePortal/Dropdown.styles';
import { Stack, Label, Icon, TooltipHost, registerIcons } from 'office-ui-fabric-react';
import { ReactComponent as UpsellIcon } from '../../upsell.svg';
interface CustomDropdownProps {
  fullpage?: boolean;
  id: string;
  subLabel?: string;
  learnMore?: {
    learnMoreLink: string;
    learnMoreText: string;
  };
}
registerIcons({
  icons: {
    'upsell-svg': <UpsellIcon style={{ width: '14px', height: '14px', fill: 'purple' }} />,
  },
});

const Dropdown = (props: FieldProps & IDropdownProps & CustomDropdownProps) => {
  const { field, form, options, learnMore, subLabel, label, fullpage, ...rest } = props;
  const theme = useContext(ThemeContext);
  const dirty = get(form.initialValues, field.name, null) !== field.value;

  const styleOverride = styleProps => {
    const baseStyle = DropDownStyles(styleProps);
    return {
      ...baseStyle,
      title: [
        ...baseStyle.title,
        dirty && {
          borderColor: theme.semanticColors.controlDirtyOutline,
        },
      ],
      label: [...baseStyle.label],
      errorMessage: [
        ...baseStyle.errorMessage,
        fullpage && {
          paddingLeft: '200px',
        },
      ],
      dropdown: [
        ...baseStyle.dropdown,
        {
          width: '275px',
        },
        dirty && {
          selectors: {
            ['&:focus .ms-Dropdown-title']: [{ borderColor: theme.semanticColors.controlDirtyOutline }],
            ['&:hover .ms-Dropdown-title']: [{ borderColor: theme.semanticColors.controlDirtyOutline }],
          },
        },
      ],
    } as IDropdownStyles;
  };
  console.log(styleOverride);
  const onChange = (e: unknown, option: IDropdownOption) => {
    form.setFieldValue(field.name, option.key);
  };
  const errorMessage = get(form.errors, field.name, '') as string;
  return (
    <Stack horizontal verticalAlign="center" style={{ marginBottom: '15px', marginLeft: '-20px' }}>
      <TooltipHost content="This feature requires a Standard Plan" calloutProps={{ gapSpace: 0 }}>
        <Icon iconName="upsell-svg" style={{ marginRight: '6px' }} styles={{ root: { color: 'purple' } }} />
      </TooltipHost>
      <Label style={{ width: '200px' }}>{label}</Label>
      <OfficeDropdown
        selectedKey={field.value === undefined ? 'null' : field.value}
        ariaLabel={props.label}
        options={options}
        onChange={onChange}
        onBlur={field.onBlur}
        errorMessage={errorMessage}
        {...rest}
        styles={styleOverride}
      />
    </Stack>
  );
};

export default Dropdown;
