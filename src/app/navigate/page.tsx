import Link from "next/link";
import { CANCER_GUIDE, getCancerGuideEssays, getCancerEssays } from "@/lib/essays";

export const metadata = {
  title: "Lou's Guide to Cancer | The Live Now Club",
  description: "Practical guidance for navigating cancer and supporting those who are.",
};

export default function NavigatePage() {
  const allCancerEssays = getCancerEssays();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <>
      {/* Header */}
      <header className="header">
        <Link href="/" className="logo">
          <img src="/images/logo-handwritten.png" alt="The Live Now Club" className="logo-img" />
        </Link>
        <nav className="nav">
          <Link href="/read">Read</Link>
          <Link href="/navigate" className="active">Navigate</Link>
          <Link href="/wonder">Wonder</Link>
          <Link href="/make">Make</Link>
        </nav>
      </header>

      <div style={{
        minHeight: '100vh',
        background: '#faf6f1'
      }}>
        {/* Hero */}
        <section style={{
          padding: '160px 24px 80px',
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center' as const
        }}>
          <span style={{
            display: 'inline-block',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '11px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase' as const,
            color: '#e84a8a',
            marginBottom: '24px',
            padding: '8px 16px',
            border: '1px solid #e84a8a',
            borderRadius: '20px'
          }}>Lou's Guide to Cancer</span>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 500,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: '#1a1a1a',
            marginBottom: '24px'
          }}>Everything I wish someone had told me.</h1>
          <p style={{
            fontSize: '1.25rem',
            lineHeight: 1.6,
            color: 'rgba(45, 42, 38, 0.7)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Practical guidance for navigating cancer and supporting those who are. Every piece here was written from the
            trenches.
          </p>
        </section>

        {/* Quick Links */}
        <section style={{
          padding: '0 24px 80px',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px'
          }}>
            {[
              { href: "#just-diagnosed", num: "01", title: "Just Diagnosed", sub: "Start here" },
              { href: "#during-treatment", num: "02", title: "During Treatment", sub: "Practical guidance" },
              { href: "#for-caregivers", num: "03", title: "For Caregivers", sub: "Supporting someone" },
              { href: "#finding-meaning", num: "04", title: "Finding Meaning", sub: "Making sense of it" }
            ].map((item) => (
              <Link key={item.href} href={item.href} style={{
                background: 'white',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                padding: '24px',
                textAlign: 'center' as const,
                transition: 'all 0.2s'
              }}>
                <span style={{
                  display: 'block',
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '24px',
                  fontWeight: 600,
                  color: '#e84a8a',
                  marginBottom: '12px'
                }}>{item.num}</span>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: '#1a1a1a',
                  marginBottom: '4px'
                }}>{item.title}</h3>
                <p style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '11px',
                  color: 'rgba(45, 42, 38, 0.5)',
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.05em'
                }}>{item.sub}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Just Diagnosed - Featured */}
        <section id="just-diagnosed" style={{
          padding: '80px 24px',
          background: 'white'
        }}>
          <div style={{ maxWidth: '900px', margin: '0 auto 40px' }}>
            <span style={{
              display: 'block',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '12px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase' as const,
              color: '#e84a8a',
              marginBottom: '12px'
            }}>01</span>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 500,
              letterSpacing: '-0.01em',
              marginBottom: '8px'
            }}>{CANCER_GUIDE[0].title}</h2>
            <p style={{
              fontSize: '1.125rem',
              color: 'rgba(45, 42, 38, 0.7)'
            }}>{CANCER_GUIDE[0].subtitle}</p>
          </div>
          <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px'
          }}>
            {getCancerGuideEssays("just-diagnosed").map((essay, i) => (
              <Link
                key={essay.slug}
                href={`/read/${essay.slug}`}
                style={{
                  background: '#faf6f1',
                  border: '1px solid rgba(0, 0, 0, 0.06)',
                  overflow: 'hidden',
                  transition: 'all 0.2s',
                  ...(i === 0 ? { gridColumn: '1 / -1', display: 'grid', gridTemplateColumns: '1fr 1fr' } : {})
                }}
              >
                {essay.image && i === 0 && (
                  <div style={{ overflow: 'hidden' }}>
                    <img src={essay.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
                <div style={{
                  padding: '24px',
                  ...(i === 0 ? { display: 'flex', flexDirection: 'column' as const, justifyContent: 'center' } : {})
                }}>
                  <span style={{
                    display: 'block',
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: '10px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase' as const,
                    color: '#e84a8a',
                    marginBottom: '8px'
                  }}>{essay.type}</span>
                  <h3 style={{
                    fontSize: i === 0 ? '1.75rem' : '1.25rem',
                    fontWeight: 500,
                    lineHeight: 1.3,
                    color: '#1a1a1a',
                    marginBottom: '8px'
                  }}>{essay.title}</h3>
                  <p style={{
                    fontSize: '0.9rem',
                    lineHeight: 1.5,
                    color: 'rgba(45, 42, 38, 0.7)'
                  }}>{essay.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Cancer Meditations */}
        <section id="cancer-meditations" style={{
          padding: '80px 24px',
          background: '#1a1a1a',
          color: 'white'
        }}>
          <div style={{ maxWidth: '900px', margin: '0 auto 40px' }}>
            <span style={{
              display: 'block',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '12px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase' as const,
              color: '#e84a8a',
              marginBottom: '12px'
            }}>Series</span>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 500,
              letterSpacing: '-0.01em',
              marginBottom: '8px',
              color: 'white'
            }}>{CANCER_GUIDE[1].title}</h2>
            <p style={{
              fontSize: '1.125rem',
              color: 'rgba(255, 255, 255, 0.6)'
            }}>{CANCER_GUIDE[1].subtitle}</p>
          </div>
          <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px'
          }}>
            {getCancerGuideEssays("cancer-meditations").map((essay, i) => (
              <Link key={essay.slug} href={`/read/${essay.slug}`} style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '24px',
                transition: 'all 0.2s'
              }}>
                <span style={{
                  display: 'block',
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '32px',
                  fontWeight: 600,
                  color: '#e84a8a',
                  marginBottom: '12px'
                }}>{String(i + 1).padStart(2, "0")}</span>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: 'white',
                  marginBottom: '8px'
                }}>{essay.title}</h3>
                <p style={{
                  fontSize: '0.85rem',
                  lineHeight: 1.5,
                  color: 'rgba(255, 255, 255, 0.6)'
                }}>{essay.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* During Treatment */}
        <section id="during-treatment" style={{
          padding: '80px 24px',
          background: '#faf6f1'
        }}>
          <div style={{ maxWidth: '900px', margin: '0 auto 40px' }}>
            <span style={{
              display: 'block',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '12px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase' as const,
              color: '#e84a8a',
              marginBottom: '12px'
            }}>02</span>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 500,
              letterSpacing: '-0.01em',
              marginBottom: '8px'
            }}>{CANCER_GUIDE[2].title}</h2>
            <p style={{
              fontSize: '1.125rem',
              color: 'rgba(45, 42, 38, 0.7)'
            }}>{CANCER_GUIDE[2].subtitle}</p>
          </div>
          <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '24px'
          }}>
            {getCancerGuideEssays("during-treatment").map((essay) => (
              <Link key={essay.slug} href={`/read/${essay.slug}`} style={{
                background: 'white',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                overflow: 'hidden',
                transition: 'all 0.2s'
              }}>
                {essay.image && (
                  <div style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                    <img src={essay.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
                <div style={{ padding: '20px' }}>
                  <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: 500,
                    color: '#1a1a1a',
                    marginBottom: '8px'
                  }}>{essay.title}</h3>
                  <p style={{
                    fontSize: '0.9rem',
                    lineHeight: 1.5,
                    color: 'rgba(45, 42, 38, 0.7)'
                  }}>{essay.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* For Caregivers */}
        <section id="for-caregivers" style={{
          padding: '80px 24px',
          background: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd9 100%)'
        }}>
          <div style={{ maxWidth: '900px', margin: '0 auto 40px' }}>
            <span style={{
              display: 'block',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '12px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase' as const,
              color: '#e84a8a',
              marginBottom: '12px'
            }}>03</span>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 500,
              letterSpacing: '-0.01em',
              marginBottom: '8px'
            }}>{CANCER_GUIDE[3].title}</h2>
            <p style={{
              fontSize: '1.125rem',
              color: 'rgba(45, 42, 38, 0.7)'
            }}>{CANCER_GUIDE[3].subtitle}</p>
          </div>
          <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px'
          }}>
            {getCancerGuideEssays("for-caregivers").map((essay) => (
              <Link key={essay.slug} href={`/read/${essay.slug}`} style={{
                background: 'white',
                padding: '28px',
                transition: 'all 0.2s'
              }}>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: 500,
                  color: '#1a1a1a',
                  marginBottom: '12px'
                }}>{essay.title}</h3>
                <p style={{
                  fontSize: '0.9rem',
                  lineHeight: 1.5,
                  color: 'rgba(45, 42, 38, 0.7)',
                  marginBottom: '16px'
                }}>{essay.excerpt}</p>
                <span style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '11px',
                  letterSpacing: '0.05em',
                  color: '#e84a8a',
                  fontWeight: 500
                }}>Read this &rarr;</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Finding Meaning */}
        <section id="finding-meaning" style={{
          padding: '80px 24px',
          background: '#faf6f1'
        }}>
          <div style={{ maxWidth: '900px', margin: '0 auto 40px' }}>
            <span style={{
              display: 'block',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '12px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase' as const,
              color: '#e84a8a',
              marginBottom: '12px'
            }}>04</span>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 500,
              letterSpacing: '-0.01em',
              marginBottom: '8px'
            }}>{CANCER_GUIDE[4].title}</h2>
            <p style={{
              fontSize: '1.125rem',
              color: 'rgba(45, 42, 38, 0.7)'
            }}>{CANCER_GUIDE[4].subtitle}</p>
          </div>
          <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '24px'
          }}>
            {getCancerGuideEssays("finding-meaning").map((essay) => (
              <Link key={essay.slug} href={`/read/${essay.slug}`} style={{
                background: 'white',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                overflow: 'hidden',
                transition: 'all 0.2s'
              }}>
                {essay.image && (
                  <div style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                    <img src={essay.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
                <div style={{ padding: '20px' }}>
                  <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: 500,
                    color: '#1a1a1a',
                    marginBottom: '8px'
                  }}>{essay.title}</h3>
                  <p style={{
                    fontSize: '0.9rem',
                    lineHeight: 1.5,
                    color: 'rgba(45, 42, 38, 0.7)'
                  }}>{essay.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Browse All Cancer Writing */}
        <section style={{
          padding: '80px 24px',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 500,
            marginBottom: '8px'
          }}>All Cancer Writing</h2>
          <p style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '12px',
            color: 'rgba(45, 42, 38, 0.5)',
            marginBottom: '24px'
          }}>{allCancerEssays.length} pieces</p>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {allCancerEssays.map((essay) => (
              <Link key={essay.slug} href={`/read/${essay.slug}`} style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr',
                gap: '16px',
                padding: '12px 0',
                borderBottom: '1px solid rgba(45, 42, 38, 0.08)',
                transition: 'all 0.2s'
              }}>
                <span style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '10px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase' as const,
                  color: 'rgba(45, 42, 38, 0.5)'
                }}>{essay.type}</span>
                <span style={{
                  fontSize: '1rem',
                  color: '#1a1a1a'
                }}>{essay.title}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Footer CTA */}
        <section style={{
          textAlign: 'center' as const,
          padding: '80px 24px',
          background: 'white',
          borderTop: '1px solid rgba(45, 42, 38, 0.08)'
        }}>
          <p style={{
            fontSize: '1.25rem',
            color: 'rgba(45, 42, 38, 0.7)',
            marginBottom: '24px'
          }}>You're not alone in this.</p>
          <a
            href="https://louiseireland.substack.com/subscribe"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary"
          >
            Get updates &rarr;
          </a>
        </section>
      </div>

      {/* Floating Subscribe */}
      <div className="subscribe-float">
        <a href="https://louiseireland.substack.com/subscribe" target="_blank" rel="noopener noreferrer">
          Subscribe
        </a>
      </div>
    </>
  );
}
