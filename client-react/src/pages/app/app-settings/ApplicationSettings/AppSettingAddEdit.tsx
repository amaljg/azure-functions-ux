import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import ActionBar from '../../../../components/ActionBar';
import { formElementStyle } from '../AppSettings.styles';
import { FormAppSetting } from '../AppSettings.types';
import { MessageBarType, MessageBar } from 'office-ui-fabric-react/lib';

export interface AppSettingAddEditProps {
  updateAppSetting: (item: FormAppSetting) => void;
  closeBlade: () => void;
  otherAppSettings: FormAppSetting[];
  appSetting: FormAppSetting;
  disableSlotSetting: boolean;
}
const AppSettingAddEdit: React.SFC<AppSettingAddEditProps> = props => {
  const { updateAppSetting, otherAppSettings, closeBlade, appSetting, disableSlotSetting } = props;
  const [nameError, setNameError] = useState('');
  const [currentAppSetting, setCurrentAppSetting] = useState(appSetting);
  const { t } = useTranslation();
  const updateAppSettingName = (e: any, name: string) => {
    const error = validateAppSettingName(name);
    setNameError(error);
    setCurrentAppSetting({ ...currentAppSetting, name });
  };

  const updateAppSettingValue = (e: any, value: string) => {
    setCurrentAppSetting({ ...currentAppSetting, value });
  };

  const updateAppSettingSticky = (e: any, sticky: boolean) => {
    setCurrentAppSetting({ ...currentAppSetting, sticky });
  };

  const validateAppSettingName = (value: string) => {
    return otherAppSettings.filter(v => v.name.toLowerCase() === value.toLowerCase()).length >= 1 ? t('appSettingNamesUnique') : '';
  };

  const save = () => {
    updateAppSetting(currentAppSetting);
  };

  const cancel = () => {
    closeBlade();
  };

  const actionBarPrimaryButtonProps = {
    id: 'save',
    title: t('update'),
    onClick: save,
    disable: !!nameError,
  };

  const actionBarSecondaryButtonProps = {
    id: 'cancel',
    title: t('cancel'),
    onClick: cancel,
    disable: false,
  };

  return (
    <>
      <form>
        <TextField
          label={t('nameRes')}
          id="app-settings-edit-name"
          value={currentAppSetting.name}
          errorMessage={nameError}
          onChange={updateAppSettingName}
          styles={{
            root: formElementStyle,
          }}
          autoFocus
        />
        <TextField
          label={t('value')}
          id="app-settings-edit-value"
          value={currentAppSetting.value}
          onChange={updateAppSettingValue}
          styles={{
            root: formElementStyle,
          }}
        />
        <Checkbox
          label={t('sticky')}
          id="app-settings-edit-sticky"
          disabled={disableSlotSetting}
          defaultChecked={currentAppSetting.sticky}
          onChange={updateAppSettingSticky}
          styles={{
            root: formElementStyle,
          }}
        />
        {disableSlotSetting && (
          <div data-cy="app-setting-slot-setting-no-permission-message">
            <MessageBar messageBarType={MessageBarType.warning} isMultiline={true}>
              {t('slotSettingNoProdPermission')}
            </MessageBar>
          </div>
        )}
        <ActionBar
          id="app-settings-edit-footer"
          primaryButton={actionBarPrimaryButtonProps}
          secondaryButton={actionBarSecondaryButtonProps}
        />
      </form>
    </>
  );
};

export default AppSettingAddEdit;
