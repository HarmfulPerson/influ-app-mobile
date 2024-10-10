import { PlusIcon } from "lucide-react-native";
import Colors from "../../../constants/Colors";
import Button from "../Button/Button";

type AddButtonListProps = {
    onButtonClick?: () => void;
};

const AddButtonList = (props: AddButtonListProps) => {
    const { onButtonClick } = props;
    return (
        <Button
            text=""
            variant="primary"
            onPress={onButtonClick}
            icon={
                <PlusIcon
                    width={44}
                    height={44}
                    color={Colors.grayscale.text.negative}
                />
            }
            iconAlign="right"
            style={{
                position: "absolute",
                bottom: 100,
                right: 20,
                width: 72,
                height: 72,
                borderWidth: 0,
            }}
        />
    );
};

export default AddButtonList;
