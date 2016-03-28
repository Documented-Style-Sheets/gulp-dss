
module.exports.styles = {

  //
  // @name Button
  // @description Your standard form button.
  //
  // @state :hover - Highlights when hovering.
  // @state :disabled - Dims the button when disabled.
  // @state .primary - Indicates button is the primary action.
  // @state .smaller - A smaller button
  //
  // @markup
  //   <button>This is a button</button>
  //
  'button': {
    padding: '5px 15px',
    lineHeight: 'normal',
    fontFamily: '"Helvetica Neue", Helvetica',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
    textShadow: '0 1px rgba(255, 255, 255, 0.9)',
    borderRadius: 3,
    border: '1px solid #ddd',
    background: '#f5f5f5',
    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.15)',
    cursor: 'pointer'
  },

  //
  // @name Anchor Tag
  // @description Your standard link tag.
  //
  // @state :hover - Background changes when hovering.
  // @state .active - Highlights link when active.
  //
  // @markup
  //   <a href="#">This is a link</a>
  //

  'a': {
    textDecoration: 'none',
    color: 'red',
    padding: 10,
    display: 'inline-block',
    background: '#efefef',
    borderRadius: 5

    '&:hover': {
      background: '#cccccc'
    },

    '&:active, &.active': {
      background: 'green'
    }
  }
}
