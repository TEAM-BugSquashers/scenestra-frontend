import classes from './NotFound.module.css'

export default function NotFound() {
    return (
    <div className={classes.wrap}>
        <h1>404 - 페이지를 찾을 수 없습니다</h1>
        <p>요청하신 페이지가 존재하지 않습니다.</p>
    </div>
    );
}