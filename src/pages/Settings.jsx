import Row from "../ui/Row";
import Heading from "../ui/Heading";
import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";

const Settings = () => {
  return (
    <Row>
      <Heading as="h1">Update Car settings</Heading>
      <UpdateSettingsForm />
    </Row>
  );
};

export default Settings;
