import type { SliderProps } from "tamagui";
import { Slider, Text, View } from "tamagui";
import Colors from "../../../constants/Colors";

const SimpleSlider = ({ children, ...props }: SliderProps) => {
  const test = props.value;
  return (
    <Slider defaultValue={[24, 80]} max={100} step={1} {...props}>
      <Slider.Track
        style={{ backgroundColor: Colors.grayscale.surface.subtle }}
      >
        <Slider.TrackActive backgroundColor="#9B3DFF" />
      </Slider.Track>
      <Slider.Thumb
        size={16}
        borderWidth={1}
        borderColor={Colors.secondary.surface.lighter}
        backgroundColor={Colors.grayscale.surface.darker}
        index={0}
        circular
        elevate
      >
        <View
          style={{
            fontSize: 10,
            marginTop: 10,
            position: "absolute",
            top: 5,
            left: -3,
            width: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text fontSize={10} color="white">
            {(props.value as Array<number>)[0]}
          </Text>
        </View>
      </Slider.Thumb>
      <Slider.Thumb
        size={16}
        borderWidth={1}
        borderColor={Colors.secondary.surface.lighter}
        backgroundColor={Colors.grayscale.surface.darker}
        index={1}
        circular
        elevate
      >
        <View
          style={{
            fontSize: 10,
            color: "red",
            marginTop: 10,
            position: "absolute",
            top: 5,
            left: -3,
            width: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text fontSize={10} color="white">
            {(props.value as Array<number>)[1]}
          </Text>
        </View>
      </Slider.Thumb>
    </Slider>
  );
};

export default SimpleSlider;
