import classes from './Review.module.css'

function Review(){
    return (
        <>
            <div className={classes.wrap}>
                <div className={classes["section_header"]}>
                    <div></div>
                    <h2>ABOUT THIS THEATER</h2>
                    <div></div>
                </div>

                <section>
                    <figure className={classes.roomImg}></figure>
                    <figcaption className={classes["imgDescription"]}>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit, nulla quod doloribus ex nesciunt repudiandae unde veniam amet id dolore mollitia accusamus voluptatum blanditiis perferendis voluptatibus. Quibusdam voluptatem deleniti vel.
                    </figcaption>
                </section>


            </div>
        </>
    );
}

export default Review;