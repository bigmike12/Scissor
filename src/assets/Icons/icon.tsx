import React from "react";
import PropTypes from "prop-types";

export interface IconProps {
  name?: string;
  className?: string;
  onClick?: (event: MouseEvent) => void;
}

const Icon: React.FC<IconProps> = (props) => {
  if (props.name === "") {
    return null;
  }

  try {
    const Image = require(`./stock/${props.name}`).default;

    if (Image) {
      return (
        <Image
          aria-label={props.name}
          className={`icon ${props.className}`}
          {...props}
        />
      );
    }
    return null;
  } catch (error) {
    console.error("Icon not found", error);
    return null;
  }
};

Icon.defaultProps = {
  className: "",
  onClick: () => {
    return null;
  },
};
Icon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Icon;
