import styled from 'styled-components';

const MyButton = styled.button`    
    background-color: ${props => {
        if(props.variant === 'solid') {
            switch(props.backgroundColor) {
                case 'primary':
                    return '#007BFF';
                case 'secondary':
                    return '#6C757D';
                case 'sucess':
                    return '#28A745';
                case 'danger':
                    return '#DC3545';
                case 'warning':
                    return '#FFC107';
                case 'info':
                    return '#17A2B8';
                case 'dark':
                    return '#343A40';
                case props.backgroundColor:
                    return props.backgroundColor;
                default:
                    return '#CCCCCC';
            }
        } else {
            return '#FFFFFF';
        }
    }};
    border: ${props => props.borderSize ? props.borderSize : '1px'} solid ${props => {
        switch(props.backgroundColor) {
            case 'primary':
                return '#007BFF';
            case 'secondary':
                return '#6C757D';
            case 'sucess':
                return '#28A745';
            case 'danger':
                return '#DC3545';
            case 'warning':
                return '#FFC107';
            case 'info':
                return '#17A2B8';
            case 'dark':
                return '#343A40';
            case props.backgroundColor:
                return props.backgroundColor;
            default:
                return '#CCCCCC';
        }
    }};
    border-radius: 3px;
    color: ${props => {
        if(props.variant === 'solid' && props.backgroundColor !== 'warning') {
            return '#FFFFFF';
        } else if (props.variant === 'solid' && props.backgroundColor === 'warning') {
            return '#000000';
        } else {
            switch(props.backgroundColor) {
                case 'primary':
                    return '#007BFF';
                case 'secondary':
                    return '#6C757D';
                case 'sucess':
                    return '#28A745';
                case 'danger':
                    return '#DC3545';
                case 'warning':
                    return '#FFC107';
                case 'info':
                    return '#17A2B8';
                case 'dark':
                    return '#343A40';
                case props.backgroundColor:
                    return props.backgroundColor;
                default:
                    return '#000000';
            }
        }
    }};
    font-size: ${props => props.fontSize === 'xlarge' ? '2.5rem' : props.fontSize === 'large' ? '1.5rem' : props.fontSize === 'small' ? '0.75rem' : '1rem'};
    margin: 0.5px;
    padding: 0rem;
    width: ${props => props.size * 100}px;
    height: 50px;
    font-weight: bold;

    &:hover {
        background-color: #EF9A9A;
        color: #000000;
        border: #EF9A9A;
        font-weight: bold;
    }
`;

export default MyButton;