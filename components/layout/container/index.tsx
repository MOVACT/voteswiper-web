import cn from 'classnames';
import styles from './container.module.css';

interface Props {
  className?: string;
}

const Container: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={cn(styles.root, 'px-6 lg:px-8 mx-auto w-full', className)}>
      {children}
    </div>
  );
};

export default Container;
