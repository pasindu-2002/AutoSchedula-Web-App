import { memo } from "react";
import "../Style/OwnerFooter.css";

function OwnerFooter() {
    return (
        <footer className='owner-text bottom-sub-container'>
            <div className='owner-text'>
                <p>HDSE232F GROUP NO.08</p>
            </div>
        </footer>
    );
}

export default memo(OwnerFooter);
