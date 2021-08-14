import "./index.scss";
export function Loading({ width, height }) {
  return (
    <div className="Loading">
      <img
        style={{ width: width, height: height }}
        src="https://cdn.dribbble.com/users/233030/screenshots/3932726/rick-sanchez.gif"
      />
    </div>
  );
}
