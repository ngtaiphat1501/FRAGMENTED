/* ==========================================================================
   FRAGMENTED GDD COMPANION APP — ENGINE LOGIC
   - Web Audio API (Ambient drone, radio noise, detuned piano synthesizer)
   - Trauma state visual & acoustic modifier
   - Combat Parry simulator (6-frame precise window check)
   - Inverted Gravity sandbox
   - Dynamic tab renderer
   ========================================================================== */

// --- DỮ LIỆU TÀI LIỆU (BẮC THÀNH JS ĐỂ TRÁNH LỖI CORS KHI MỞ TRỰC TIẾP TỆP FILE://) ---
const GDD_DOCUMENTS = {
    "01": `
        <div class="doc-content-wrapper">
            <h1>CHƯƠNG 1: TỔNG QUAN DỰ ÁN & HỆ GIÁ TRỊ CỐT LÕI</h1>
            <p class="widget-desc">Mã số tài liệu: FRAG-GDD-001 | Trình trạng: Đã phê duyệt</p>
            <hr>
            <h2>1. Ý TƯỞNG CỐT LÕI (CONCEPT)</h2>
            <p><strong>FRAGMENTED</strong> là một trò chơi phiêu lưu hành động 2D cuộn cảnh màn hình ngang, kết hợp yếu tố kinh dị tâm lý và dẫn chuyện biểu tượng. Trò chơi lấy cảm hứng từ chiều sâu ẩn ức của <em>Silent Hill 2</em>, đồ họa biểu tượng của <em>Omori</em>, và cơ chế chiến đấu khắc nghiệt nhưng công bằng của <em>Dark Souls</em>.</p>
            
            <div class="alert-box important">
                <div class="alert-title">Thông Điệp Nghệ Thuật</div>
                <p>"Ký ức không biến mất. Chúng chỉ bị khóa lại." Hành trình trong game là quá trình nhân vật đối diện với sự thật kinh hoàng của quá khứ để tự giải thoát bản thân khỏi tội lỗi.</p>
            </div>

            <h2>2. BA TRỤ CỘT THIẾT KẾ (DESIGN PILLARS)</h2>
            <h3>A. Trải nghiệm Ngột ngạt Biểu tượng (Symbolic Suffocation)</h3>
            <p>Mọi sinh vật và yếu tố môi trường trong game đều đại diện cho chấn thương tâm lý cụ thể. Ví dụ: Teddy Husk là gấu bông rách đại diện cho tuổi thơ bị bỏ rơi; Smile Crawlers đại diện cho sự phán xét từ xã hội.</p>
            
            <h3>B. Chiến đấu Khắc nghiệt, Đánh đổi (High-Risk Combat)</h3>
            <p>Người chơi không thể càn quét vô định. Mỗi đòn tấn công tiêu tốn thể lực, đòi hỏi quan sát kẻ địch để đưa ra quyết định Parry (Đỡ đòn) hoặc Dash (Né đòn) chính xác từng frame.</p>

            <h3>C. Thay đổi Quy luật theo Trauma (Trauma-driven Gameplay)</h3>
            <p>Chỉ số Chấn thương (Trauma) thay thế cho thanh năng lượng. Khi Trauma tăng cao, thế giới xung quanh sẽ biến đổi vật lý, quái vật hung hãn hơn và xuất hiện các ảo giác âm thanh.</p>

            <h2>3. THỊ TRƯỜNG & ĐỐI TƯỢNG ĐÍCH</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nền Tảng</th>
                        <th>Độ Tuổi Mục Tiêu</th>
                        <th>Thời Lượng Chơi Dự Kiến</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>PC (Steam), Nintendo Switch, PS5, Xbox Series</td>
                        <td>18+ (Kinh dị tâm lý nặng)</td>
                        <td>8 - 10 Tiếng (Chơi đơn)</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,
    "02": `
        <div class="doc-content-wrapper">
            <h1>CHƯƠNG 2: CƠ CHẾ GAMEPLAY & HỆ THỐNG ĐIỀU KHIỂN</h1>
            <p class="widget-desc">Mã số tài liệu: FRAG-GDD-002 | Trình trạng: Đã phê duyệt</p>
            <hr>
            <h2>1. SƠ ĐỒ ĐIỀU KHIỂN BÀN PHÍM (KEYBOARD LAYOUT)</h2>
            <p>Nhóm phát triển cấu hình hệ thống điều khiển mặc định theo chuẩn dưới đây:</p>
            <table>
                <thead>
                    <tr>
                        <th>Nút bấm</th>
                        <th>Hành động</th>
                        <th>Cơ chế hoạt họa (VFX)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>A / D</strong></td>
                        <td>Di chuyển Trái / Phải</td>
                        <td>Hiệu ứng bụi mờ dưới chân</td>
                    </tr>
                    <tr>
                        <td><strong>Space</strong></td>
                        <td>Nhảy (Jump)</td>
                        <td>Hỗ trợ Coyote Time (0.08 giây trễ)</td>
                    </tr>
                    <tr>
                        <td><strong>Chuột Trái [LMB]</strong></td>
                        <td>Đánh Nhẹ (Combo 3 đòn)</td>
                        <td>Glitch nhẹ màn hình khi trúng địch</td>
                    </tr>
                    <tr>
                        <td><strong>Q / Chuột Giữa</strong></td>
                        <td>Đỡ Đòn (Parry)</td>
                        <td>Khung chính xác: 6 frames đầu</td>
                    </tr>
                    <tr>
                        <td><strong>Shift Trái</strong></td>
                        <td>Né đòn (Dash)</td>
                        <td>Có 12 frames bất tử (i-frames)</td>
                    </tr>
                    <tr>
                        <td><strong>E</strong></td>
                        <td>Sử dụng Kỹ năng đang chọn</td>
                        <td>Tiêu hao năng lượng Trauma tương ứng</td>
                    </tr>
                </tbody>
            </table>

            <h2>2. CƠ CHẾ CHỈ SỐ KÉP: VITALITY VS TRAUMA</h2>
            <p>Trạng thái tâm lý của nhân vật chính được định lượng qua hai thanh chỉ số chạy song song:</p>
            
            <div class="alert-box note">
                <div class="alert-title">Thanh Trauma (Chấn Thương) - Cơ chế biến đổi</div>
                <ul>
                    <li><strong>Dưới 40%:</strong> Màn hình bình thường, âm thanh rõ ràng.</li>
                    <li><strong>40% - 75%:</strong> Xuất hiện viền đen tối (Vignette), âm thanh bắt đầu bị méo tiếng nhẹ (Low-pass lọc treble).</li>
                    <li><strong>Trên 75%:</strong> Giao diện chuyển hoàn toàn đỏ đen, xuất hiện tiếng thì thầm gọi tên nhân vật, kẻ địch kích hoạt các đòn đánh điên cuồng.</li>
                </ul>
            </div>

            <h2>3. HỆ THỐNG KỸ NĂNG ĐẶC BIỆT MỞ KHÓA</h2>
            <h3>Kỹ năng 1: Dash Xuyên Máu (Blood Dash)</h3>
            <p>Hóa thành vệt bóng đỏ lướt qua kẻ địch và đòn đánh của chúng. i-frames tăng lên 18 frames. Reset cooldown nếu né tránh đòn đánh thành công.</p>
            
            <h3>Kỹ năng 2: Phá Lệ (Sound Burst)</h3>
            <p>Giải phóng tiếng thét câm lặng dạng sóng âm tròn. Hất tung quái vật nhỏ, phá vỡ cấu trúc tường nứt trong màn chơi.</p>

            <h3>Kỹ năng 3: Mặt Nạ Tàn Phá (Ruin Mask)</h3>
            <p>Tự động kích hoạt khi HP dưới 25%. Sát thương tăng 50%, nhưng Trauma tự tăng 2% mỗi giây. Khi Trauma đầy 100%, nhân vật sẽ ngất xỉu.</p>
        </div>
    `,
    "03": `
        <div class="doc-content-wrapper">
            <h1>CHƯƠNG 3: THIẾT KẾ MÀN CHƠI, CÂU ĐỐ & QUÁI VẬT</h1>
            <p class="widget-desc">Mã số tài liệu: FRAG-GDD-003 | Trình trạng: Đã phê duyệt</p>
            <hr>
            <h2>1. KHU VỰC CHƯƠNG 2: THIẾT KẾ TRỌNG LỰC ĐẢO CHIỀU TRONG KHÔNG GIAN 2.5D</h2>
            <p>Tại Chapter 2 (Thị trấn Đảo Chiều), khi người chơi tương tác với Điểm Neo Trọng Lực, thế giới sẽ xoay ngược 180 độ. Trong môi trường 2.5D, camera Cinemachine thực hiện một cú xoay (Roll Dutch) 180 độ mượt mà quanh trục Z, tạo ra hiệu ứng chóng mặt và bất an tâm lý sâu sắc.</p>
            
            <!-- GRAVITY SIMULATOR WIDGET PLACEHOLDER -->
            <div id="gravity-sim-target"></div>

            <h2>2. DANH SÁCH QUÁI VẬT & AI BEHAVIOR</h2>
            <h3>Teddy Husk (Gấu Bông Rách)</h3>
            <p><strong>Thiết kế:</strong> Gấu bông rách bụng, lòng thò xúc tu đen. Di chuyển lê bước chậm chạp. Đòn tấn công: Đập tay (Slam) và phóng xúc tu kéo người chơi lại gần. Khi chết phát tiếng khóc trẻ con.</p>

            <h3>Smile Crawlers (Kẻ Mặt Cười)</h3>
            <p><strong>Thiết kế:</strong> Người gầy đen bò bằng 4 chân, mặt là bảng vẽ mặt cười sơn đỏ. Rình rập ở các góc tối. Đòn tấn công: Nhảy vồ ôm đầu cắn xé (rút máu và tăng Trauma nhanh) hoặc phun độc axit làm chậm.</p>

            <h2>3. CHI TIẾT CÁC TRẬN BOSS</h2>
            <table>
                <thead>
                    <tr>
                        <th>Tên Boss</th>
                        <th>Địa Điểm Đấu Trường</th>
                        <th>Cơ chế đặc thù</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Con Rối Khóc</strong></td>
                        <td>Đầm lầy đồ chơi cũ (Chapter 1)</td>
                        <td>Phase 1: Bay đu dây, ném nước mắt tạo quái nhỏ. Phase 2: Tự cắt dây, bò 4 chân điên cuồng trong bóng tối.</td>
                    </tr>
                    <tr>
                        <td><strong>Thẩm Phán Không Mắt</strong></td>
                        <td>Phòng xử án treo ngược (Chapter 2)</td>
                        <td>Không đánh trực tiếp. Liên tục tuyên phạt: Khóa nút né, đảo ngược phím di chuyển, ẩn thanh máu. Khắc chế bằng Sound Burst.</td>
                    </tr>
                    <tr>
                        <td><strong>Diễn Viên Đeo Mặt</strong></td>
                        <td>Sân khấu tròn (Chapter 3)</td>
                        <td>Đeo 4 mặt nạ khác nhau. Mặt nạ "Lạc" sẽ copy toàn bộ chiêu thức, combo và counter-parry người chơi.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,
    "04": `
        <div class="doc-content-wrapper">
            <h1>CHƯƠNG 4: KỊCH BẢN ĐIỆN ẢNH CHI TIẾT</h1>
            <p class="widget-desc">Mã số tài liệu: FRAG-GDD-004 | Trình trạng: Kịch bản phân cảnh chính thức</p>
            <hr>
            
            <div class="scene-header">CẢNH 1: HÀNH LANG TRẮNG — VÔ TẬN</div>
            <div class="scene-action">Màn hình tối. Tiếng rè radio chập chờn. Ánh sáng trắng mở ra đột ngột. NHÂN VẬT CHÍNH nằm run rẩy trên nền gạch trắng vô tận. Không có tường. Không có trời. Anh khẽ mở mắt.</div>
            
            <div class="dialogue-block">
                <span class="dialogue-char">NHÂN VẬT CHÍNH</span>
                <span class="dialogue-parenthetical">(Thì thầm, ôm đầu)</span>
                <span class="dialogue-text">Đây là đâu?... Tôi không thể nhớ gì cả...</span>
            </div>

            <div class="scene-action">Một BÓNG MỜ đen tuyền, không mặt với đôi mắt trắng sáng xuất hiện ở khoảng cách 10 mét, cơ thể hắn giật liên tiếp từng frame hình lỗi.</div>

            <div class="dialogue-block">
                <span class="dialogue-char">BÓNG MỜ</span>
                <span class="dialogue-text">Cuối cùng... ngươi cũng chịu tỉnh dậy.</span>
            </div>
            
            <div class="dialogue-block">
                <span class="dialogue-char">NHÂN VẬT CHÍNH</span>
                <span class="dialogue-text">Tôi đang ở đâu? Ngươi là ai?</span>
            </div>

            <div class="dialogue-block">
                <span class="dialogue-char">BÓNG MỜ</span>
                <span class="dialogue-text">Nơi những thứ bị chôn vùi tiếp tục sống. Muốn biết sự thật không? Hãy đi xuống sâu hơn nữa.</span>
            </div>

            <hr>
            <h2>3 KẾT THÚC CHÍNH (BRANCHING ENDINGS)</h2>
            
            <div class="alert-box important">
                <div class="alert-title">KẾT THÚC XẤU (BAD END) — CHỐI BỎ</div>
                <p>Người chơi giết Bản Ngã Cũ. Ký ức bùng cháy dữ dội. Nhân vật chính mở mắt ra, tỉnh lại ở Hành Lang Trắng vô tận. Mọi thứ reset về vạch xuất phát. Bóng Mờ lại xuất hiện và vòng lặp tiếp diễn.</p>
            </div>

            <div class="alert-box note">
                <div class="alert-title">KẾT THÚC TRUNG LẬP — ĐỐI DIỆN</div>
                <p>Người chơi không giết Bản Ngã Cũ nhưng cũng không tha thứ. Nhân vật sống cô độc trong căn hộ tối ở thành phố, nhìn vào gương nhà tắm im lặng chịu đựng nỗi đau tinh thần mà không thể trốn chạy.</p>
            </div>

            <div class="alert-box note">
                <div class="alert-title">KẾT THÚC ĐẸP NHẤT (TRUE END) — HÒA GIẢI</div>
                <p>Người chơi buông kiếm, ôm lấy Bản Ngã Cũ (em trai). Thế giới đen tối tan rã. Nhân vật chính mở mắt ra trong phòng trị liệu tâm lý ấm áp đầy ánh nắng chiều. Bác sĩ (chính là Bóng Mờ) hỏi: "Hôm nay, cậu nhớ thêm được điều gì chưa?". Nhân vật mỉm cười nhẹ nhõm: "Tôi đã nhớ ra em trai tôi... và tôi sẵn sàng buông bỏ rồi".</p>
            </div>
        </div>
    `,
    "05": `
        <div class="doc-content-wrapper">
            <h1>CHƯƠNG 5: HƯỚNG DẪN MỸ THUẬT & THIẾT KẾ ÂM THANH</h1>
            <p class="widget-desc">Mã số tài liệu: FRAG-GDD-005 | Trình trạng: Đã phê duyệt</p>
            <hr>
            <h2>1. QUY CHUẨN MỸ THUẬT PIXEL ART GIỚI HẠN MÀU</h2>
            <p>Trò chơi tuân thủ thiết kế 2D Pixel Art tả thực có độ phân giải gốc 640x360. Tông màu bị giới hạn hoàn toàn trong các sắc thái:</p>
            <ul>
                <li><strong>Đen tuyền (#0A0A0A):</strong> Chiếm 70% bối cảnh màn chơi, thể hiện bóng tối của vô thức.</li>
                <li><strong>Trắng chói (#FFFFFF):</strong> Đại diện cho vùng chối bỏ ký ức, ánh sáng nhân tạo.</li>
                <li><strong>Đỏ Crimson (#8B0000):</strong> Chỉ dùng cho máu, các vết nứt chấn thương, chiêu thức Blood Dash.</li>
                <li><strong>Xám u uất (#4F4F4F):</strong> Dùng cho người dân Không Mặt và thị trấn.</li>
            </ul>

            <h2>2. THIẾT KẾ ÂM THANH DYNAMIC AUDIO</h2>
            <p>Lập trình viên tích hợp bộ lọc Low-pass Filter cho nhạc nền. Khi chỉ số Trauma tăng lên, các âm cao (Treble) bị triệt tiêu dần, chỉ giữ lại các âm trầm (Bass) đục ngầu để mô phỏng cảm giác nghẹt tai, hoảng loạn sinh học.</p>
            
            <h2>3. DANH SÁCH SOUNDTRACK</h2>
            <table>
                <thead>
                    <tr>
                        <th>Tên Bản Nhạc</th>
                        <th>Khu vực phát</th>
                        <th>Nhạc cụ & Không khí</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>01. White Corridor</strong></td>
                        <td>Prologue</td>
                        <td>Ambient drone 40Hz, tiếng tích tắc đồng hồ rất chậm.</td>
                    </tr>
                    <tr>
                        <td><strong>02. Forest of Regrets</strong></td>
                        <td>Chapter 1</td>
                        <td>Piano detuned rải phím lệch tông nhẹ, tiếng radio rè nhỏ.</td>
                    </tr>
                    <tr>
                        <td><strong>03. Stage of Deception</strong></td>
                        <td>Chapter 3</td>
                        <td>Harpsichord chơi điệu waltz méo tiếng, tiếng vỗ tay ngược.</td>
                    </tr>
                    <tr>
                        <td><strong>04. Reconciliation</strong></td>
                        <td>True End Credits</td>
                        <td>Piano trong trẻo tông Đô Trưởng kết hợp guitar gỗ ấm áp.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,
    "06": `
        <div class="doc-content-wrapper">
            <h1>CHƯƠNG 6: KIẾN TRÚC KỸ THUẬT DÀNH CHO LẬP TRÌNH VIÊN (2.5D)</h1>
            <p class="widget-desc">Mã số tài liệu: FRAG-GDD-006 | Trình trạng: Đã thông qua Kiến trúc sư phần mềm</p>
            <hr>
            <h2>1. MÁY TRẠNG THÁI PLAYER VỚI VẬT LÝ 3D (RIGIDBODY 3D)</h2>
            <p>Để vận hành trong không gian 2.5D, nhân vật chính sử dụng Rigidbody 3D nhưng bị khóa cứng di chuyển trên trục Z. C# Script mẫu áp dụng Constraints cứng:</p>

            <pre><code>[RequireComponent(typeof(Rigidbody))]
public class PlayerController : MonoBehaviour {
    private Rigidbody rb;
    public float fixedZPosition = 0.0f;

    void Awake() {
        rb = GetComponent&lt;Rigidbody&gt;();
        // Khóa chuyển động Z và toàn bộ góc quay vật lý 3D
        rb.constraints = RigidbodyConstraints.FreezePositionZ | 
                         RigidbodyConstraints.FreezeRotationX | 
                         RigidbodyConstraints.FreezeRotationY | 
                         RigidbodyConstraints.FreezeRotationZ;
    }
    
    void Update() {
        // Đảm bảo không bị lệch khỏi trục Z do sai số vật lý 3D
        if (!Mathf.Approximately(transform.position.z, fixedZPosition)) {
            transform.position = new Vector3(transform.position.x, transform.position.y, fixedZPosition);
        }
    }
}</code></pre>

            <h2>2. MA TRẬN VA CHẠM VẬT LÝ 3D (2.5D COLLISION MATRIX)</h2>
            <p>Để tối ưu vật lý trong Unity, cài đặt ma trận va chạm 3D chính xác:</p>
            <table>
                <thead>
                    <tr>
                        <th>Layer (3D Colliders)</th>
                        <th>Player (Layer 1)</th>
                        <th>Enemy (Layer 2)</th>
                        <th>Obstacles (Layer 3)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Player (Layer 1)</strong></td>
                        <td>Không va chạm</td>
                        <td>Không va chạm</td>
                        <td><strong>CÓ</strong></td>
                    </tr>
                    <tr>
                        <td><strong>Enemy (Layer 2)</strong></td>
                        <td>Không va chạm</td>
                        <td><strong>CÓ</strong></td>
                        <td><strong>CÓ</strong></td>
                    </tr>
                    <tr>
                        <td><strong>Obstacles (Layer 3)</strong></td>
                        <td><strong>CÓ</strong></td>
                        <td><strong>CÓ</strong></td>
                        <td><strong>CÓ</strong></td>
                    </tr>
                </tbody>
            </table>

            <h2>3. THIẾT LẬP CAMERA XOAY 3D VỚI CINEMACHINE & DOTWEEN</h2>
            <p>Khi đổi chiều không gian, Camera Cinemachine Virtual Camera sẽ xoay Dutch 180 độ:</p>
            <pre><code>// Xoay trục camera Z (Cinemachine Dutch roll) tạo hiệu ứng chóng mặt
float targetRoll = isGravityInverted ? 180f : 0f;
DOTween.To(
    () => virtualCamera.m_Lens.Dutch,
    x => virtualCamera.m_Lens.Dutch = x,
    targetRoll,
    0.8f
).SetEase(Ease.InOutQuint);</code></pre>
        </div>
    `
};

// --- QUẢN LÝ TABS ---
document.addEventListener("DOMContentLoaded", () => {
    const tabLinks = document.querySelectorAll(".tab-link");
    const docContent = document.getElementById("doc-content");
    const traumaValueHeader = document.getElementById("trauma-value-header");

    function loadChapter(chapterId) {
        // Render content
        docContent.innerHTML = GDD_DOCUMENTS[chapterId] || "<p>Lỗi: Không tìm thấy tài liệu.</p>";
        
        // Nếu là Chapter 3, chèn thêm widget mô phỏng trọng lực lật ngược
        if (chapterId === "03") {
            const simTarget = document.getElementById("gravity-sim-target");
            const simSource = document.getElementById("gravity-sim-holder");
            if (simTarget && simSource) {
                simTarget.innerHTML = simSource.innerHTML;
                setupGravitySimulator();
            }
        }
    }

    tabLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            tabLinks.forEach(t => t.classList.remove("active"));
            link.classList.add("active");
            
            const chapter = link.getAttribute("data-chapter");
            loadChapter(chapter);
        });
    });

    // Tải chương 1 mặc định
    loadChapter("01");

    // --- BỘ PHÁT ÂM THANH DYNAMIC CHUYÊN NGHIỆP (WEB AUDIO API) ---
    let audioCtx = null;
    let ambientOsc = null;
    let ambientGain = null;
    let radioNoise = null;
    let radioGain = null;
    let audioFilterNode = null; // Low-pass filter cho Trauma

    const btnAmbient = document.getElementById("btn-ambient");
    const btnRadio = document.getElementById("btn-radio");
    const btnPiano = document.getElementById("btn-piano");
    const sliderVolume = document.getElementById("slider-volume");
    const sliderTrauma = document.getElementById("slider-trauma");
    const sliderTraumaVal = document.getElementById("slider-trauma-val");

    function initAudioContext() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            
            // Tạo bộ lọc Low-pass chính nối ra đầu ra âm thanh
            audioFilterNode = audioCtx.createBiquadFilter();
            audioFilterNode.type = 'lowpass';
            audioFilterNode.frequency.setValueAtTime(20000, audioCtx.currentTime); // Mặc định mở hoàn toàn

            // Volume Master
            masterGainNode = audioCtx.createGain();
            masterGainNode.gain.setValueAtTime(sliderVolume.value, audioCtx.currentTime);

            // Nối chuỗi âm thanh: Sound Source -> Filter -> Master Gain -> Output
            audioFilterNode.connect(masterGainNode);
            masterGainNode.connect(audioCtx.destination);
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
    }

    let masterGainNode = null;

    // A. 40Hz Drone Ambient Synthesizer
    btnAmbient.addEventListener("click", () => {
        initAudioContext();
        if (ambientOsc) {
            // Tắt
            ambientOsc.stop();
            ambientOsc.disconnect();
            ambientOsc = null;
            btnAmbient.classList.remove("btn-crimson");
            btnAmbient.innerHTML = '<span class="btn-icon">🔊</span> BẬT ÂM NỀN (40Hz Drone)';
        } else {
            // Bật
            ambientOsc = audioCtx.createOscillator();
            ambientOsc.type = 'triangle';
            ambientOsc.frequency.setValueAtTime(40, audioCtx.currentTime); // 40Hz drone

            ambientGain = audioCtx.createGain();
            ambientGain.gain.setValueAtTime(0.3, audioCtx.currentTime);

            ambientOsc.connect(ambientGain);
            ambientGain.connect(audioFilterNode);
            ambientOsc.start();

            btnAmbient.classList.add("btn-crimson");
            btnAmbient.innerHTML = '<span class="btn-icon">🔇</span> TẮT ÂM NỀN (40Hz Drone)';
        }
    });

    // B. Radio Static Noise Generator
    btnRadio.addEventListener("click", () => {
        initAudioContext();
        if (radioNoise) {
            // Tắt
            radioNoise.stop();
            radioNoise.disconnect();
            radioNoise = null;
            btnRadio.classList.remove("btn-crimson");
            btnRadio.innerHTML = '<span class="btn-icon">📻</span> TIẾNG RÈ RADIO (Static)';
        } else {
            // Bật
            const bufferSize = audioCtx.sampleRate * 2;
            const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
            const output = noiseBuffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                output[i] = Math.random() * 2 - 1; // Tạo nhiễu trắng
            }

            radioNoise = audioCtx.createBufferSource();
            radioNoise.buffer = noiseBuffer;
            radioNoise.loop = true;

            // Bộ lọc tiếng radio cũ (Highpass + Lowpass kết hợp)
            const radioFilter = audioCtx.createBiquadFilter();
            radioFilter.type = 'bandpass';
            radioFilter.frequency.value = 1000;
            radioFilter.Q.value = 1.0;

            radioGain = audioCtx.createGain();
            radioGain.gain.setValueAtTime(0.08, audioCtx.currentTime); // Tiếng rè nhỏ thôi

            radioNoise.connect(radioFilter);
            radioFilter.connect(radioGain);
            radioGain.connect(audioFilterNode);

            radioNoise.start();

            btnRadio.classList.add("btn-crimson");
            btnRadio.innerHTML = '<span class="btn-icon">🔇</span> TẮT RE RADIO (Static)';
        }
    });

    // C. Piano Note Chime Synth (Detuned Piano)
    const minorScale = [146.83, 164.81, 174.61, 196.00, 220.00, 261.63]; // Scale nhạc nốt u sầu (D, E, F, G, A, C)
    btnPiano.addEventListener("click", () => {
        initAudioContext();
        playPianoNote();
    });

    function playPianoNote() {
        const noteFreq = minorScale[Math.floor(Math.random() * minorScale.length)];
        
        // Bộ dao động âm thanh cho tiếng Piano (Sự kết hợp Sine + Triangle tạo âm sắc ấm nhưng thô)
        const osc = audioCtx.createOscillator();
        osc.type = 'sine';
        
        // Cơ chế detuned đàn piano lạc điệu
        const detuneAmt = (Math.random() * 20) - 10; // Chệch khoảng -10 đến +10 cents
        osc.frequency.setValueAtTime(noteFreq, audioCtx.currentTime);
        osc.detune.setValueAtTime(detuneAmt, audioCtx.currentTime);

        const gainNode = audioCtx.createGain();
        // Envelope: Phát tiếng gõ mạnh lúc đầu, sau đó giảm dần (decay/release)
        gainNode.gain.setValueAtTime(0.4, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.8);

        osc.connect(gainNode);
        gainNode.connect(audioFilterNode);
        osc.start();
        osc.stop(audioCtx.currentTime + 2.0);
    }

    // Điều chỉnh âm lượng Master
    sliderVolume.addEventListener("input", (e) => {
        if (masterGainNode) {
            masterGainNode.gain.setValueAtTime(e.target.value, audioCtx.currentTime);
        }
    });

    // D. Trình Giả Lập Trauma (Thay đổi bộ lọc Audio + Giao diện hình ảnh)
    sliderTrauma.addEventListener("input", (e) => {
        const val = parseInt(e.target.value);
        sliderTraumaVal.innerText = val + "%";
        traumaValueHeader.innerText = val + "%";

        // 1. Áp dụng bộ lọc âm thanh Low-pass
        if (audioFilterNode) {
            // Khi Trauma tăng cao (lên 100%), hạ tần số cắt xuống 350Hz (nghẹt đặc tai)
            // Khi Trauma ở mức 0%, nâng tần số lên 20000Hz (nghe rõ hoàn toàn)
            const cutoffFreq = 20000 - ((val / 100) * 19650);
            audioFilterNode.frequency.setValueAtTime(cutoffFreq, audioCtx.currentTime);
        }

        // 2. Thay đổi hiệu ứng thị giác (VFX CSS Filters)
        const container = document.body;
        if (val < 40) {
            container.style.filter = "none";
        } else if (val >= 40 && val < 75) {
            // Màn hình bắt đầu có viền tối, lệch sắc sai nhẹ
            container.style.filter = `contrast(1.1) brightness(0.9) sepia(0.1)`;
        } else {
            // Hoảng loạn: Chuyển sang tông màu tối, tương phản cao, nhuốm màu đỏ
            container.style.filter = `contrast(1.4) brightness(0.7) hue-rotate(330deg) saturate(1.5)`;
        }
    });

    // --- BỘ PHÁT PARRY TIMING SIMULATOR (6-FRAMES WINDOW CHECK) ---
    const btnAttack = document.getElementById("btn-combat-attack");
    const btnParry = document.getElementById("btn-combat-parry");
    const framePointer = document.getElementById("frame-pointer");
    const hitIndicator = document.getElementById("hit-indicator");
    const enemySprite = document.getElementById("enemy-sprite");
    const playerSprite = document.getElementById("player-sprite");

    let isAttacking = false;
    let attackTimer = null;
    let frameIndex = 0;

    btnAttack.addEventListener("click", () => {
        if (isAttacking) return;
        initAudioContext();

        isAttacking = true;
        btnAttack.disabled = true;
        btnParry.disabled = false;
        hitIndicator.innerText = "KẺ ĐỊCH CHUẨN BỊ...";
        hitIndicator.style.color = "#888";
        framePointer.style.left = "0%";
        frameIndex = 0;

        // Hoạt ảnh kẻ địch nhấp nháy chuẩn bị chém
        enemySprite.style.transform = "translateX(-15px)";

        // Sau 0.5s chuẩn bị, đòn chém quét nhanh qua thanh timeline
        setTimeout(() => {
            if (!isAttacking) return;
            hitIndicator.innerText = "NÉ HOẶC PARRY NGAY!";
            hitIndicator.style.color = "var(--color-crimson-bright)";
            enemySprite.style.transform = "translateX(50px)";

            const start = Date.now();
            const duration = 800; // Đòn tấn công kéo dài 0.8 giây tổng cộng

            attackTimer = setInterval(() => {
                const elapsed = Date.now() - start;
                const progress = Math.min(100, (elapsed / duration) * 100);
                framePointer.style.left = progress + "%";

                // Khoảng khung Parry vàng: progress từ 35% đến 55% (Tương ứng 6 frames phản xạ)
                // Lưu trạng thái hiện tại
                frameIndex = progress;

                if (elapsed >= duration) {
                    clearInterval(attackTimer);
                    // Người chơi bị dính đòn (Không nhấn Parry kịp)
                    if (isAttacking) {
                        hitIndicator.innerText = "DÍNH ĐÒN! (+20% TRAUMA)";
                        hitIndicator.style.color = "var(--color-crimson-bright)";
                        playerSprite.style.transform = "translateX(10px)";
                        setTimeout(() => playerSprite.style.transform = "translateX(0)", 100);
                        
                        // Tăng Trauma phạt
                        sliderTrauma.value = Math.min(100, parseInt(sliderTrauma.value) + 20);
                        sliderTrauma.dispatchEvent(new Event('input'));
                        
                        resetCombatSim();
                    }
                }
            }, 16); // 60 FPS update
        }, 600);
    });

    btnParry.addEventListener("click", () => {
        if (!isAttacking) return;
        clearInterval(attackTimer);

        // Kiểm tra khung Parry vàng (35% đến 55% tiến trình)
        if (frameIndex >= 35 && frameIndex <= 55) {
            hitIndicator.innerText = "PARRY THÀNH CÔNG! (CHOÁNG KẺ ĐỊCH)";
            hitIndicator.style.color = "#4af626"; // Terminal green
            
            // Hiệu ứng giật rung chấn
            document.body.classList.add("pulse");
            setTimeout(() => document.body.classList.remove("pulse"), 500);

            // Phát âm thanh va chạm kim loại tần số cao tự tổng hợp
            if (audioCtx) {
                const osc = audioCtx.createOscillator();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(800, audioCtx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.3);

                const gainNode = audioCtx.createGain();
                gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);

                osc.connect(gainNode);
                gainNode.connect(audioFilterNode);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.3);
            }
        } else {
            // Đỡ quá sớm hoặc quá muộn
            hitIndicator.innerText = "ĐỠ HỤT! THẤT BẠI";
            hitIndicator.style.color = "var(--color-crimson-bright)";
            
            // Phạt Trauma
            sliderTrauma.value = Math.min(100, parseInt(sliderTrauma.value) + 15);
            sliderTrauma.dispatchEvent(new Event('input'));
        }

        resetCombatSim();
    });

    function resetCombatSim() {
        isAttacking = false;
        btnAttack.disabled = false;
        btnParry.disabled = true;
        enemySprite.style.transform = "translateX(0)";
    }

    // Gán phím nóng bàn phím để tương tác giống chơi thật
    window.addEventListener("keydown", (e) => {
        if (e.key === "q" || e.key === "Q") {
            if (!btnParry.disabled) {
                btnParry.click();
            }
        }
        if (e.key === "r" || e.key === "R") {
            const btnGravity = document.getElementById("btn-rotate-gravity");
            if (btnGravity) btnGravity.click();
        }
    });

    // --- BỘ PHÁT GIẢ LẬP TRỌNG LỰC XOAY MAP (CHAPTER 2 MECHANIC) ---
    function setupGravitySimulator() {
        const btnRotate = document.getElementById("btn-rotate-gravity");
        const gravityArena = document.getElementById("gravity-arena");
        const simPlayer = document.getElementById("sim-player");
        const exitDoor = document.querySelector(".sim-exit");

        if (!btnRotate) return;

        btnRotate.addEventListener("click", () => {
            initAudioContext();
            
            // Đổi trạng thái đảo chiều
            gravityArena.classList.toggle("inverted");

            // Phát âm thanh xoay không gian trầm ấm
            if (audioCtx) {
                const osc = audioCtx.createOscillator();
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(80, audioCtx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(30, audioCtx.currentTime + 0.8);

                const gainNode = audioCtx.createGain();
                gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);

                osc.connect(gainNode);
                gainNode.connect(audioFilterNode);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.8);
            }

            // Cập nhật lối ra dựa trên trạng thái trọng lực
            if (gravityArena.classList.contains("inverted")) {
                exitDoor.innerHTML = "🔓 LỐI RA ĐÃ MỞ (TRÊN TRẦN)";
                exitDoor.style.borderColor = "#4af626";
                exitDoor.style.color = "#4af626";
                simPlayer.innerText = "🙃"; // Lật ngược avatar
            } else {
                exitDoor.innerHTML = "🔒 LỐI RA BỊ KHÓA";
                exitDoor.style.borderColor = "var(--color-crimson-bright)";
                exitDoor.style.color = "var(--color-crimson-bright)";
                simPlayer.innerText = "👤";
            }
        });
    }
});
