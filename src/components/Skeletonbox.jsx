// components/SkeletonBox.jsx
import "../App.css";

function SkeletonBox({ width = "100%", height = "16px", borderRadius = "4px", style = {} }) {
  return (
    <div
      className="skeleton shimmer"
      style={{ width, height, borderRadius, ...style }}
    >
    </div>
  );
}

export default SkeletonBox;
