
  <Grid item xs={12} md={7}>
    <img
      style={{ width: '100%', aspectRatio: 16/9, height: 'auto', objectFit: 'cover' }}
      src="./assets/getting-started/platform-overview/Everything-You-Need.png"
      alt=""
    />
  </Grid>
</Grid>

{sections.map((section, index) => (
  <Grid style={{ marginBottom: 48 }} item xs={12} key={index}>
    {section.title && (
      <Typography variant='h1'>{section.title}</Typography>
    )}
    <div style={{ marginTop: 16, marginBottom: 48 }}>
      {section.description && (
        <p>{section.description}</p>
      )}
      {section.buttons && section.buttons.map((button, btnIndex) => (
        <Button
          key={btnIndex}
          style={{ marginTop: 8, marginRight: 24 }}
          variant="contained"
          color="secondary"
          size="large"
          href={button.href}
        >
          {button.text}
        </Button>
      ))}
    </div>
    {section.content && (
      <Grid container spacing={4}>
        {section.content.map((content, contentIndex) => {
          const mdValue = 12 / section.content.length;
          return (
            <Grid item xs={12} sm={6} md={mdValue} key={contentIndex}>
              <div style={{ marginBottom: 48 }}>
                {content.image && (
                  <img
                    style={{ width: '100%', aspectRatio: 16/9, height: 'auto', objectFit: 'cover' }}
                    src={content.image}
                    alt=""
                  />
                )}
                {content.video && (
                  <iframe
                    style={{ width: '100%', aspectRatio: 16/9, height: 'auto' }}
                    src={content.video}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                  ></iframe>
                )}
                <h3>{content.title}</h3>
                <p>{content.description}</p>
                {content.links && content.links.map((link, linkIndex) => (
                  <a href={link.href} key={linkIndex}>
                    <Typography variant='buttonLarge'>{link.text}</Typography><br />
                  </a>
                ))}
                {content.buttons && content.buttons.map((button, btnIndex) => (
                  <Button
                    key={btnIndex}
                    style={{ marginTop: 16, marginRight: 24 }}
                    variant="contained"
                    color="secondary"
                    size="large"
                    href={button.href}
                  >
                    {button.text}
                  </Button>
                ))}
              </div>
            </Grid>
          );
        })}
      </Grid>
    )}
  </Grid>
))}
