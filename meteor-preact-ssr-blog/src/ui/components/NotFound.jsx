import { h } from 'preact';

export default ({ context }) => {
  context.statusCode = 404;
  return (
    <h1>404 Not found</h1>
  )
}