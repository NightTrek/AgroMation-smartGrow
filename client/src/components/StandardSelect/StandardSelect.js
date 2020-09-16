
import { withStyles, FormControl } from "@material-ui/core";
// import { Autocomplete } from '@material-ui/lab/Autocomplete';
// import TextField from '@material-ui/core/TextField';


export const StandardRoundSelectForm = withStyles((theme) => ({

    root: {
        borderRadius: "24px",
        background: theme.palette.secondary.dark,
        paddingLeft: "24px",
        paddingRight: '20px',
        "& .muiSelect-select": {

        }
    },

}))(FormControl);




// export const ComboBox = () =>