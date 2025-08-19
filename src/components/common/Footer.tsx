import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-muted/30 border-t mt-auto" style={{ marginTop: '100px' }}>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="font-bold text-xl text-black mb-4 block">
              ALL‑IN‑WOM
            </Link>
            <p className="text-muted-foreground mb-4">
              여성 사업가를 위한 올인원 비즈니스 플랫폼
            </p>
            <p className="text-sm text-muted-foreground">
              © 2025 ALL-IN-WOM. All rights reserved.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">지원</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/settings" className="text-muted-foreground hover:text-primary transition-colors">
                  설정
                </Link>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  고객센터
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  이용가이드
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}