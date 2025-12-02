import './styles/page.css';

export default function Home() {
  return (
    <main>
      <h1>Thank you for coming! Wanna head on in?</h1>
      <a href="/bookshelf" className="hover-link">
        Go to the Bookshelf →
      </a>
    </main>
  );
}