import { Component } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelSerice from '../../services/MarvelSerice';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false,
        classCharInfo: 'char__info'
    }

    marvelSerice = new MarvelSerice();

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.chandePositionBlock);
    }

    updateChar = () => {
        const {charId} = this.props;
        if (!charId) {
            return;
        }

        this.onCharLoading();

        this.marvelSerice
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }
    
    chandePositionBlock = () => {
        if (window.scrollY >= 425) {
            this.setState({
                classCharInfo: 'char__info char__info_fixed'
            })
        } else {
            this.setState({
                classCharInfo: 'char__info'
            })
        }
    }

    render() {
        const {char, loading, error, classCharInfo} = this.state;

        const skeleton =  char || loading || error ? null : <Skeleton/>;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !char) ? <View char={char}/> : null;

        window.addEventListener('scroll', this.chandePositionBlock)

        return (
            <div className={classCharInfo}>
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;

    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" || 
        thumbnail ===  'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif') {
        imgStyle = {'objectFit' : 'contain'}
    }

    const shortComicsList = (comics) => {
        const newArr = [];
            try {
                for (let i = 0; i < (comics.length < 10 ? comics.length : 10); i++) {
                    const elem = (
                        <li key={i} className="char__comics-item">
                            <a href={comics[i].resourceURI}>{comics[i].name}</a>
                        </li>
                    );
                    newArr.push(elem);
                }
                return newArr;
            } catch (e) {
                console.log(e);
            }
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">{description}</div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {
                    comics.length > 0 ? shortComicsList(comics) : 'There is no comics with this character'
                }
                    
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;
