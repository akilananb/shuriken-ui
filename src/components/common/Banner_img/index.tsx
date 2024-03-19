interface Props {
  src: string;
  className?: string;
}

const Index: React.FC<Props> = ({ src, className }) => {
  return <img src={src} className={className} alt="Banner Img" />;
};

export default Index;
