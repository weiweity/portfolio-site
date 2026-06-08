import {
  Mail,
  Phone,
  MapPin,
  Download,
  ArrowUpRight,
  Briefcase,
  MessageCircle,
} from "lucide-react";
import { CONTACT } from "../lib/data";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative py-24 md:py-32"
      style={{ background: "var(--bg-elevated-2)" }}
    >
      <div className="container-shell px-5 md:px-8 lg:px-12">
        <div className="reveal max-w-3xl mx-auto text-center">
          <p
            className="text-sm font-mono tracking-widest uppercase"
            style={{ color: "var(--brand-orange)" }}
          >
            / Contact
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter2">
            聊一聊？<span className="gradient-text">随时在线。</span>
          </h2>
          <p
            className="mt-6 text-base md:text-lg leading-relaxed text-pretty"
            style={{ color: "var(--text-secondary)" }}
          >
            求职意向：
            <span
              className="font-medium"
              style={{ color: "var(--text-primary)" }}
            >
              AI 赋能专家 / 业务型 AI 产品经理
            </span>
            <br />
            {CONTACT.expectedSalary} · {CONTACT.city} · 随时可面谈
          </p>
        </div>

        <div className="reveal mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* 左：联系方式 */}
          <div className="card-soft p-6 md:p-8 space-y-2">
            <h3
              className="font-display text-lg font-semibold flex items-center gap-2 mb-3"
              style={{ color: "var(--text-primary)" }}
            >
              <Briefcase
                className="h-4 w-4"
                style={{ color: "var(--brand-orange)" }}
              />
              联系方式
            </h3>
            <a
              href={`mailto:${CONTACT.email}`}
              className="flex items-center gap-3 p-3 rounded-lg transition-colors group"
            >
              <div
                className="h-9 w-9 rounded-full flex items-center justify-center shrink-0"
                style={{
                  background: "var(--bg-elevated-2)",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                <Mail
                  className="h-4 w-4"
                  style={{ color: "var(--brand-orange)" }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div
                  className="text-xs"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  邮箱
                </div>
                <div
                  className="text-sm font-mono truncate"
                  style={{ color: "var(--text-primary)" }}
                >
                  {CONTACT.email}
                </div>
              </div>
              <ArrowUpRight
                className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                style={{ color: "var(--text-tertiary)" }}
              />
            </a>
            <a
              href={`tel:${CONTACT.phone}`}
              className="flex items-center gap-3 p-3 rounded-lg transition-colors"
            >
              <div
                className="h-9 w-9 rounded-full flex items-center justify-center shrink-0"
                style={{
                  background: "var(--bg-elevated-2)",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                <Phone
                  className="h-4 w-4"
                  style={{ color: "var(--brand-orange)" }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div
                  className="text-xs"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  手机
                </div>
                <div
                  className="text-sm font-mono"
                  style={{ color: "var(--text-primary)" }}
                >
                  {CONTACT.phone}
                </div>
              </div>
            </a>
            <div className="flex items-center gap-3 p-3">
              <div
                className="h-9 w-9 rounded-full flex items-center justify-center shrink-0"
                style={{
                  background: "var(--bg-elevated-2)",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                <MapPin
                  className="h-4 w-4"
                  style={{ color: "var(--brand-amber)" }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div
                  className="text-xs"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  所在地
                </div>
                <div
                  className="text-sm"
                  style={{ color: "var(--text-primary)" }}
                >
                  {CONTACT.city}
                </div>
              </div>
            </div>
          </div>

          {/* 右：简历下载（按钮居中） */}
          <div className="card-soft p-6 md:p-8 flex flex-col">
            <h3
              className="font-display text-lg font-semibold flex items-center gap-2"
              style={{ color: "var(--text-primary)" }}
            >
              <Download
                className="h-4 w-4"
                style={{ color: "var(--brand-orange)" }}
              />
              简历下载
            </h3>
            <p
              className="mt-2 text-sm leading-relaxed"
              style={{ color: "var(--text-tertiary)" }}
            >
              完整简历 PDF（已同步最新版 · 2026.06）含个人优势、工作经历、6 大项目 STAR、技术栈清单、教育背景。
            </p>
            <div className="flex-1 flex items-center justify-center my-6">
              <a
                href={CONTACT.resumeUrl}
                download
                className="btn-primary !py-4 !px-8 !text-base"
              >
                <Download className="h-4 w-4" />
                下载简历 PDF
              </a>
            </div>
            <div
              className="pt-4 flex items-center gap-2 text-xs"
              style={{
                color: "var(--text-tertiary)",
                borderTop: "1px solid var(--border-subtle)",
              }}
            >
              <MessageCircle className="h-3.5 w-3.5" />
              <span>微信：可在面试邀约邮件中获取</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
