import { Color } from '../../../common'
import { styled } from '@material-ui/styles'
import { Button } from '@material-ui/core'

export default {
    formContainer: {
        marginTop: '20vh',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '500px'
    },
    introParagraph: {
        color: '#aaa'
    },
    inputGroup: {
        display: 'block',
        marginTop: '20px',
        maxWidth: '400px',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    input: {
        width: '100%'
    }
}

export const LoginButton = styled(Button)({
    color: '#fff',
    backgroundColor: Color.darkBlue,
    borderRadius: 5,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 60,
    paddingRight: 60,
    marginLeft: 50
})

export const SignupButton = styled(Button)({
    color: Color.darkBlue,
    alignContent: 'flex-end',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 60,
    paddingRight: 60,
    borderStyle: 'solid',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Color.darkBlue,
    marginRight: 50
})
