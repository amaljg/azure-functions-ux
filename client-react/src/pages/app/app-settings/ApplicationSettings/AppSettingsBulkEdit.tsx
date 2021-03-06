import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormAppSetting } from '../AppSettings.types';
import ActionBar from '../../../../components/ActionBar';
import { MessageBarType } from 'office-ui-fabric-react';
import { getErrorMessage, formAppSettingToUseSlotSetting, formAppSettingToUseStickySetting } from './ApplicationSettings.utils';
import MonacoEditor from '../../../../components/monaco-editor/monaco-editor';

interface AppSettingsBulkEditProps {
  updateAppSetting: (item: FormAppSetting[]) => void;
  closeBlade: () => void;
  appSettings: FormAppSetting[];
}
const AppSettingsBulkEdit: React.FC<AppSettingsBulkEditProps> = props => {
  const { t } = useTranslation();
  const { updateAppSetting, closeBlade, appSettings } = props;
  const [errorMessage, setErrorMessage] = useState('');
  const [appSettingsState, setAppSettingsState] = useState(formAppSettingToUseSlotSetting(appSettings));

  const validate = newValue => {
    const err = getErrorMessage(newValue, t);
    setErrorMessage(err);
  };
  const save = () => {
    updateAppSetting(formAppSettingToUseStickySetting(appSettingsState));
  };

  const cancel = () => {
    closeBlade();
  };

  const actionBarPrimaryButtonProps = {
    id: 'save',
    title: t('update'),
    onClick: save,
    disable: !!errorMessage,
  };

  const actionBarSecondaryButtonProps = {
    id: 'cancel',
    title: t('cancel'),
    onClick: cancel,
    disable: false,
  };

  const onChange = (newValue, event) => {
    setAppSettingsState(newValue);
    validate(newValue);
  };
  return (
    <form>
      <MonacoEditor
        value={appSettingsState}
        language="json"
        onChange={onChange}
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
        }}
      />
      <ActionBar
        id="app-settings-bulk-edit-footer"
        primaryButton={actionBarPrimaryButtonProps}
        secondaryButton={actionBarSecondaryButtonProps}
        statusMessage={
          errorMessage
            ? {
                message: errorMessage,
                level: MessageBarType.error,
              }
            : undefined
        }
      />
    </form>
  );
};

export default AppSettingsBulkEdit;
