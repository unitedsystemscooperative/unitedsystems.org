import Image from 'next/image';
const engineerIcon = '/img/shipBuilds/Engineer_icon.svg';

export const EngIcons = (props: { engLevel: number; ditchText?: boolean }) => {
  let icons: JSX.Element[] = [];
  if (props.engLevel > 3 || props.engLevel < 1) {
    return (
      <div>
        <p>{props.ditchText ? 'None' : 'Engineering Level: None'}</p>
      </div>
    );
  } else {
    for (let i = 1; i <= props.engLevel; i++) {
      icons = [
        ...icons,
        <Image
          src={engineerIcon}
          key={i}
          alt="Engineering Icon"
          height={20}
          width={20}
        />,
      ];
    }
    if (props.ditchText)
      return (
        <div>
          <p>{icons.map((icon) => icon)}</p>
        </div>
      );
    return (
      <div>
        <p>
          <span>Engineering Level:</span> {icons.map((icon) => icon)}
        </p>
      </div>
    );
  }
};
