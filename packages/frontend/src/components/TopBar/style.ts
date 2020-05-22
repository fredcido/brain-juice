import { makeStyles } from '@material-ui/core/styles';
import { MindJuiceTheme } from '../App/App';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  link: {
    color: MindJuiceTheme.palette.primary.main,
    textDecoration: 'none'
  },
}));


export default useStyles;