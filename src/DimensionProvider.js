import * as React from "react";
import { Dimensions } from "react-native";

const { Provider, Consumer } = React.createContext({ width: 0, height: 0 });

class DimensionsProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getDimensions();
  }

  getDimensions() {
    const { width, height } = Dimensions.get("window");
    return { width, height };
  }

  updateDimensions = () => {
    this.setState(this.getDimensions());
  };

  componentDidMount() {
    Dimensions.addEventListener("change", this.updateDimensions);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.updateDimensions);
  }

  render() {
    const { children } = this.props;
    return <Provider value={this.state}>{children}</Provider>;
  }
}

export default { Provider: DimensionsProvider, Consumer };
