import {withStyles, FormControl} from "@material-ui/core"

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