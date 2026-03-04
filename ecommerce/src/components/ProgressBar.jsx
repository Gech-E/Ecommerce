import './ProgressBar.css';

export function ProgressBar({ currentStatus, progressPercent }) {
    const steps = ['Preparing', 'Shipped', 'Delivered'];

    return (
        <>
            <div className="progress-labels-container">
                {steps.map((step) => (
                    <div
                        key={step}
                        className={`progress-label${step === currentStatus ? ' current-status' : ''}`}
                    >
                        {step}
                    </div>
                ))}
            </div>

            <div className="progress-bar-container">
                <div
                    className="progress-bar"
                    style={{ width: `${progressPercent}%` }}
                ></div>
            </div>
        </>
    );
}
