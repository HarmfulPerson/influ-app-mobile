import { Text, View } from "tamagui";
import Background from "../common/background";

const TaskListLayout = () => {
  const mainArea = <View></View>;
  return <Background title="LISTA ZADAŃ" mainArea={mainArea} isMailIconDisplayed={false} />;
};

export default TaskListLayout;
