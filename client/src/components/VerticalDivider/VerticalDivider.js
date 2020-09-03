import {withStyles, Divider} from "@material-ui/core"

 const VerticleDividerStyled = withStyles((theme) => ({

    root: {
        background:theme.palette.secondary.dark,
        "& .MuiDivider-vertical": {
            
        }
    },

}))(Divider);

export default VerticleDividerStyled;