type Json = Record<string, unknown>;

/**
 * Renders one or more JSON-LD blocks. Server component — the <script> is in the
 * static HTML, nothing ships to the client.
 */
export default function JsonLd({ data }: { data: Json | Json[] }) {
  const blocks = Array.isArray(data) ? data : [data];
  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}
