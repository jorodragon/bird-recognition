export const Loading = (props) => {
  const { width = 40, height = 40 } = props;
  return (
    <div
      class="spinner-border text-success"
      role="status"
      style={{ width: width, height: height }}
    >
      <span class="sr-only">Loading...</span>
    </div>
  );
};
